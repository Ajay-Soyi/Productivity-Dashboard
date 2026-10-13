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
  const visibleSection = document.querySelector("main section:not([hidden])");
  activeElement.classList.remove("active");
  e.target.classList.add("active");
  visibleSection.setAttribute("hidden", "");
  document.getElementById("feature-todo").removeAttribute("hidden");
});
