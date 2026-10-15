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
