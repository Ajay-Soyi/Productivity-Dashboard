const dateTimeContainer = document.getElementById("dayflow-date-time");

// dashboard timer part
const setDateTimeDashboard = () => {
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.toLocaleString("en-US", { weekday: "long" });
  const date = today.getDate();
  const time = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  dateTimeContainer.innerHTML = `
      <span class="date-label" data-date>${day.toUpperCase()}, ${month.toUpperCase()} ${date}</span>
      <strong class="date-time" data-time>${time}</strong>
  `;
};
setDateTimeDashboard();
setInterval(() => {
  setDateTimeDashboard();
}, 60000);

// Navigation
const dashboard = document.getElementById("dashboard");
const todoPage = document.getElementById("feature-todo");
const sidebarNav = document.getElementById("dayflow-sidebar-nav");
const dashboardSidebar = document.getElementById("dayflow-dashboard-sidebar");

sidebarNav.addEventListener("click", (e) => {
  const activeElement = document.querySelector(".active");
  const visibleSection = document.querySelector("main>section:not([hidden])");

  let selectedSection;
  if (e.target.textContent === "⌂ Overview") {
    selectedSection = "dashboard";
  } else if (e.target.textContent === "▦ Daily planner") {
    selectedSection = "feature-planner";
  } else if (e.target.textContent === "◎ Daily goals") {
    selectedSection = "feature-goals";
  } else if (e.target.textContent === "◷ Focus timer") {
    selectedSection = "feature-pomodoro";
  } else {
    selectedSection = "feature-todo";
  }

  activeElement.classList.remove("active");
  e.target.classList.add("active");
  visibleSection.setAttribute("hidden", "");
  document.getElementById(`${selectedSection}`).removeAttribute("hidden");
});

// second navigation
const secondSidebarNav = document.getElementById("dayflow-extra-side-nav");
secondSidebarNav.addEventListener("click", (e) => {
  const activeElement = document.querySelector(".active");
  const visibleSection = document.querySelector("main>section:not([hidden])");

  let selectedSection;
  if (e.target.closest("[data-feature='motivation']")) {
    selectedSection = "feature-motivation";
  } else if (e.target.closest('[data-feature="weather"]')) {
    selectedSection = "feature-weather";
  }
  activeElement.classList.remove("active");
  e.target.classList.add("active");
  visibleSection.setAttribute("hidden", "");
  document.getElementById(`${selectedSection}`).removeAttribute("hidden");
});

/* TODO LIST */

let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];
const todoForm = document.getElementById("dayflow-todo-form");
const totalTasks = document.querySelector("#dayflow-todo-list-total-tasks");
const emptyTodo = document.getElementById("dayflow-empty-todo");
const taskContainer = document.getElementById("dayflow-todo-task-container");

// delete todo
const deleteTodo = (id) => {
  const tasksTempArr = tasksArr.filter((elem) => elem.id !== id);
  tasksArr = tasksTempArr;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  totalTasks.textContent = tasksArr.length;
  if (tasksArr.length === 0) emptyTodo.removeAttribute("hidden");

  todoListTaskUI();
};

// update completed todo
const isTodoCompleted = (e, id) => {
  let isCompleted = e.target.checked;
  tasksArr.find((elem) => elem.id === id).completed = isCompleted;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  todoListTaskUI();
};

// updata important todo
const isTodoImportant = (id) => {
  const tasksTempArr = tasksArr.map((elem) => {
    if (elem.id === id) elem.important = !elem.important;
    return elem;
  });
  tasksArr = tasksTempArr;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  todoListTaskUI();
};

// render task list
const todoListTaskUI = () => {
  taskContainer.innerHTML = "";
  tasksArr.forEach((elem) => {
    taskContainer.innerHTML += `
        <li class="task-row">
          <label class="task-main"
            ><input 
            onclick=isTodoCompleted(event,${elem.id})
            id="dayflow-todo-completed" type="checkbox"
            ${elem.completed ? "checked" : ""} 
            data-task-complete /><span
              class="custom-check"
            ></span
            ><span class="task-text  ${elem.completed ? "line-through-todo" : ""} "
              >${elem.task}</span
            ></label
          ><button
            onclick=isTodoImportant(${elem.id})
            class="important-button ${elem.important ? "selected" : ""}"
            type="button"
            aria-label="Mark important"
            data-task-important
          >
            ★</button
          ><button
            onclick=deleteTodo(${elem.id})
            class="delete-button"
            type="button"
            aria-label="Delete task"
            data-task-delete
          >
            ×
          </button>
        </li>
    `;
  });
};

todoListTaskUI();

totalTasks.textContent = tasksArr.length;
if (tasksArr.length === 0) {
  emptyTodo.removeAttribute("hidden");
} else {
  emptyTodo.setAttribute("hidden", "");
}
// add task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = e.target[0].value;
  if (task.trim() === "") return;
  tasksArr.push({
    id: Date.now(),
    task,
    important: false,
    completed: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  todoListTaskUI();
  emptyTodo.setAttribute("hidden", "");
  totalTasks.textContent = tasksArr.length;
  e.target[0].value = "";
});

/* Daily Planner */
let dailyPlansArr = JSON.parse(localStorage.getItem("dailyPlans")) || [];
const dailyPlanner = document.getElementById("dayflow-daily-planner");
const dailyflowInputs = [
  ...document.querySelectorAll("#dayflow-daily-planner input"),
];

dailyflowInputs.forEach((elem) => {
  const time =
    elem.parentElement.parentElement.querySelector("time").textContent;
  const planContent = dailyPlansArr.find((elem) => elem.time === time);

  if (planContent) {
    elem.value = planContent.plan;
  }
});

dailyPlanner.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    const currSelectedTimeSlot = e.target.parentElement.parentElement;
    const prevSelectedTimeSlot = document.querySelector(
      "#dayflow-daily-planner .current-slot",
    );
    const time = currSelectedTimeSlot.querySelector("time").textContent;
    if (prevSelectedTimeSlot)
      prevSelectedTimeSlot.classList.remove("current-slot");
    currSelectedTimeSlot.classList.add("current-slot");
    e.target.onkeydown = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.trim() === "") {
          const hasToUpdate = dailyPlansArr.findIndex((elem) => {
            return elem.time === time;
          });
          if (hasToUpdate) {
            dailyPlansArr.splice(hasToUpdate, 1);
          } else {
            return;
          }
        } else {
          e.target.value = e.target.value;
          const hasToUpdate = dailyPlansArr.findIndex((elem) => {
            return elem.time === time;
          });
          if (hasToUpdate !== -1) {
            dailyPlansArr[hasToUpdate] = {
              ...dailyPlansArr[hasToUpdate],
              plan: e.target.value,
            };
          } else {
            dailyPlansArr.push({
              id: Date.now(),
              plan: e.target.value,
              time,
            });
          }
        }

        localStorage.setItem("dailyPlans", JSON.stringify(dailyPlansArr));
        currSelectedTimeSlot.classList.remove("current-slot");
        e.target.blur();
      }
    };
  }
});

/* Daily Goals */

let goalsArr = JSON.parse(localStorage.getItem("goals")) || [];
const dailyGoalsForm = document.getElementById("dayflow-daily-goals-form");
const dailyGoalsContainer = document.getElementById("dayflow-daily-goals-list");
const dailyGoalsProgressTrack = document.getElementById(
  "dayflow-daily-goals-progress-track",
);
const dailyGoalsGoalProgress = document.getElementById(
  "dayflow-daily-goals-goal-progress",
);
const dailyGoalsGoalPercent = document.getElementById("dayflow-goal-percent");
const dailyGoalsGoalRing = document.getElementById(
  "dayflow-daily-goals-goal-ring",
);

const renderProgressTrack = () => {
  // First Progress Track
  const totalGoals = goalsArr.length;
  const completedGoals = goalsArr.reduce((count, elem) => {
    if (elem.completed) count++;
    return count;
  }, 0);
  let progressPercent = (completedGoals / totalGoals) * 100 || 0;

  dailyGoalsProgressTrack.setAttribute("style", `width: ${progressPercent}%`);
  dailyGoalsGoalProgress.textContent = `${completedGoals} of ${totalGoals} completed`;

  // Circulat Progress Track
  progressPercent = Math.round(progressPercent);

  dailyGoalsGoalPercent.innerHTML = `${progressPercent}<span>%</span>`;
  dailyGoalsGoalRing.style.background = `
  conic-gradient(#53b591 0 ${progressPercent}%, #d9f1e5 ${progressPercent}% 100%)
  `;
};

const handleComplete = (e, id) => {
  const tempGoalsArr = goalsArr.map((elem) =>
    elem.id === id ? { ...elem, completed: e.target.checked } : elem,
  );
  goalsArr = tempGoalsArr;
  localStorage.setItem("goals", JSON.stringify(goalsArr));
  renderDailyGoalsUI();
};

const renderDailyGoalsUI = () => {
  renderProgressTrack();
  dailyGoalsContainer.innerHTML = "";
  goalsArr.forEach((elem) => {
    dailyGoalsContainer.innerHTML += `
      <li class="goal-row ${elem.completed ? "completed" : ""}">
        <label
          ><input ${elem.completed ? "checked" : ""} onclick="handleComplete(event,${elem.id})" type="checkbox" data-goal-complete /><span
            class="custom-check"
          ></span
          ><span>${elem.goal}</span></label
        ><span class="goal-tag">${elem.goalTag}</span>
      </li>
    `;
  });
};

renderDailyGoalsUI();

dailyGoalsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const goalStr = e.target[0].value;
  const idx = goalStr.indexOf("#");
  let goal = goalStr;
  let goalTag = "GENERAL";
  if (idx !== -1) {
    goal = goalStr.slice(0, idx);
    goalTag = goalStr.slice(idx + 1).toUpperCase();
  }

  goalsArr.push({
    id: Date.now(),
    goal,
    goalTag,
    completed: false,
  });
  localStorage.setItem("goals", JSON.stringify(goalsArr));
  e.target[0].value = "";
  renderDailyGoalsUI();
});

/* Focus Timer */
const timerContainer = document.getElementById("dayflow-timer-wrap");
const timerDisplay = document.getElementById("dayflow-timer-display");
const dataSessionCount = document.getElementById("dayflow-data-session-count");
const session = JSON.parse(localStorage.getItem("sessions")) || 0;

let time = 25 * 60;
let orgTime = time;
let timeout;
let isPaused = false;

const renderDataSessionCount = () => {
  dataSessionCount.textContent = session;
};

renderDataSessionCount();
const renderCountdown = () => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (time <= 0) {
    clearTimeout(timeout);
    isPaused = false;
    session++;
    localStorage.setItem("session", `${session}`);
    renderDataSessionCount();
    return;
  }

  time--;
  timeout = setTimeout(renderCountdown, 1000);
};

timerContainer.addEventListener("click", (e) => {
  const clickedSession = e.target.closest("[data-session]");
  const activeSessionBtn = document.querySelector(
    ".timer-session-tabs .active",
  );

  // Session selection
  if (clickedSession) {
    clearTimeout(timeout);
    isPaused = false;

    if (activeSessionBtn) {
      activeSessionBtn.classList.remove("active");
    }

    clickedSession.classList.add("active");

    if (clickedSession.dataset.session === "work") {
      time = 25 * 60;
    } else if (clickedSession.dataset.session === "short-break") {
      time = 5 * 60;
    } else if (clickedSession.dataset.session === "long-break") {
      time = 15 * 60;
    }

    orgTime = time;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  // Start / Resume
  if (e.target.closest("[data-timer-start]")) {
    if (!timeout && time > 0 && !isPaused) {
      renderCountdown();
    } else if (isPaused && time > 0) {
      isPaused = false;
      renderCountdown();
    }
  }

  // Pause
  if (e.target.closest("[data-timer-pause]")) {
    clearTimeout(timeout);
    timeout = null;
    isPaused = true;
  }

  // Reset
  if (e.target.closest("[data-timer-reset]")) {
    clearTimeout(timeout);
    timeout = null;
    time = orgTime;
    isPaused = false;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
});

/* motivation */
const addQuote = document.getElementById("dayflow-new-quote-btn");
const quote = document.querySelector(".motivation-stage blockquote");
let currQuote = JSON.parse(localStorage.getItem("currQuote")) || {
  id: -1,
  quote: "The secret of getting ahead is getting started.",
  author: "Mark Twain",
};
const author = document.getElementById("author-name");

const renderQuoteUI = () => {
  quote.textContent = currQuote.quote;
  author.textContent = currQuote.author;
};
renderQuoteUI();

addQuote.addEventListener("click", async () => {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data = await response.json();
  currQuote = data;
  localStorage.setItem("currQuote", JSON.stringify(currQuote));
  renderQuoteUI();
});

/* Weather */

const place = document.querySelector(".weather-main-card .weather-place");
const weatherDate = document.querySelector(".weather-main-card .weather-date");
const weatherIcon = document.querySelector(".weather-big-icon");
const weatherTemp = document.querySelector(
  ".weather-main-card .weather-big-temp",
);
const feelsLike = document.querySelector(".weather-main-card #feels-like");
const humidity = document.querySelector(".weather-stat-grid #dayflow-humidity");
const windSpeed = document.querySelector(
  ".weather-stat-grid #dayflow-weather-speed",
);
const precipitation = document.querySelector(
  ".weather-stat-grid #dayflow-precipitation",
);
const uvIndex = document.querySelector(".weather-stat-grid #dayflow-uv-index");

const fetchWeather = async () => {
  const response = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=013e8648243a4170aa7100459262310&q=28.6,77.2&days=3",
  );
  const data = await response.json();
  return data;
};

const renderWeatherUI = async () => {
  const data = await fetchWeather();
  place.textContent = data.location.region;
  weatherDate.textContent = data.current.condition.text;
  weatherIcon.setAttribute("src", data.current.condition.icon);
  weatherTemp.innerHTML = `${data.current.temp_c} °C`;
  feelsLike.textContent = `${data.current.feelslike_c}°C`;
  humidity.innerHTML = `${data.current.humidity}<small>%</small>`;
  windSpeed.innerHTML = `${data.current.wind_kph}<small> km/h</small>`;
  precipitation.innerHTML = `${data.current.precip_mm}<small> mm</small>`;
  uvIndex.innerHTML = `${data.current.uv}`;
};

fetchWeather();
renderWeatherUI();
