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

const deleteTodo = (id) => {
  const tasksTempArr = tasksArr.filter((elem) => elem.id !== id);
  tasksArr = tasksTempArr;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  totalTasks.textContent = tasksArr.length;
  if (tasksArr.length === 0) emptyTodo.removeAttribute("hidden");

  todoListTaskUI();
};

const isTodoCompleted = (e, id) => {
  let isCompleted = e.target.checked;
  tasksArr.find((elem) => elem.id === id).completed = isCompleted;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  todoListTaskUI();
};

const isTodoImportant = (id) => {
  const tasksTempArr = tasksArr.map((elem) => {
    if (elem.id === id) elem.important = !elem.important;
    return elem;
  });
  tasksArr = tasksTempArr;
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  todoListTaskUI();
};

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
