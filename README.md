# Dayflow — Productivity Dashboard

A clean, browser-based productivity dashboard designed to help users organise daily tasks, plan their schedules, track goals, and stay focused through dedicated productivity tools.

Dayflow is a frontend development assignment built with **HTML, CSS, and vanilla JavaScript**. It brings essential daily planning features together in a single interface while practising DOM manipulation, event handling, browser storage, and API integration.

## Overview

Dayflow provides a central workspace for everyday productivity. Users can navigate between individual tools, manage tasks and goals, organise their daily schedule, run focus sessions, read motivational quotes, and check weather information.

The project focuses on implementing core functionality using fundamental web technologies without a frontend framework or backend.

## Features

### Task Management

- Add tasks to a personal to-do list.
- Mark tasks as completed.
- Mark important tasks for quick identification.
- Delete tasks when they are no longer needed.
- Save task data in browser storage.

### Daily Planner

- Organise activities using hourly time slots.
- Add plans to specific times of the day.
- Save schedule entries in browser storage.

### Daily Goals

- Create and organise daily goals.
- Mark goals as completed.
- View progress through completion indicators.

### Focus Timer

- Run a countdown timer for focused work.
- Choose between three session presets:
  - Focus — 25 minutes
  - Short break — 5 minutes
  - Long break — 15 minutes
- Start, pause, resume, and reset the timer.

### Motivational Quotes

- Display a motivational quote.
- Fetch a new quote from an external API.
- Retain the current quote using browser storage.

### Weather Information

- Retrieve current weather information through WeatherAPI.
- Display temperature, weather conditions, feels-like temperature, humidity, wind speed, precipitation, and UV index.
- Use configured geographic coordinates for the weather request.

### Dashboard and Navigation

- Display the current date and time.
- Provide a central overview of the available productivity tools.
- Navigate between feature-specific views using the sidebar and overview cards.

## Tech Stack

| Technology           | Purpose                                   |
| -------------------- | ----------------------------------------- |
| HTML5                | Page structure and semantic elements      |
| CSS3                 | Layout, styling, and visual presentation  |
| JavaScript (ES6+)    | Application logic and interactivity       |
| DOM API              | Updating and rendering interface elements |
| LocalStorage         | Persisting selected data in the browser   |
| Fetch API            | Retrieving data from external services    |
| DummyJSON Quotes API | Fetching motivational quotes              |
| WeatherAPI           | Retrieving weather information            |

## Getting Started

### Prerequisites

- A modern web browser such as Chrome, Firefox, Safari, or Edge.
- Git, if you want to clone the repository.
- An internet connection for external API features.

## Project Structure

```text
Productivity-Dashboard/
├── index.html    # Application structure and feature views
├── style.css     # Styling and layout
├── script.js     # Navigation, functionality, and API requests
└── README.md     # Project documentation
```

## How It Works

### Client-Side Functionality

The application uses JavaScript event listeners to handle user interactions. DOM manipulation updates task lists, goal progress, timer displays, and weather information as needed.

### Data Persistence

Selected application data is stored in the browser using `localStorage`. This allows tasks, daily plans, goals, and the current motivational quote to remain available after a page refresh in the same browser.

Data is stored locally rather than in a remote database. It is not automatically synchronised between browsers or devices, and clearing the browser's site data can remove saved information.

### API Integration

The application uses the Fetch API to request motivational quotes from DummyJSON and weather information from WeatherAPI. These features depend on the external services being reachable and returning usable responses.

## Current Scope

Dayflow currently implements the core functionality of a frontend productivity dashboard. It is a learning project focused on building interactive interfaces and connecting JavaScript logic to real user interactions.

The current version does not include user authentication, a backend database, cloud synchronisation, or multi-user support.

## Potential Improvements

- Improve error handling and loading states for API requests.
- Add stronger form validation and user feedback.
- Improve accessibility, keyboard navigation, and responsive behaviour.
- Refine timer session tracking and persistence.
- Add configurable locations and improve weather request handling.
- Introduce automated tests and more maintainable JavaScript modules.
- Expand dashboard summaries using actual task and goal data.

These are possible future enhancements, not claims about the current implementation.

## Learning Outcomes

Working on this project provided practical experience with:

- Structuring web pages using HTML.
- Styling interfaces using CSS.
- Manipulating the DOM and handling events with JavaScript.
- Managing arrays and objects to represent application data.
- Persisting data with `localStorage`.
- Working with asynchronous JavaScript and the Fetch API.
- Connecting multiple features within a single-page interface.
- Debugging and integrating independent pieces of frontend functionality.

## Author

**Ajay Soyi**

- GitHub: [@Ajay-Soyi](https://github.com/Ajay-Soyi)
- Project repository: [Productivity-Dashboard](https://github.com/Ajay-Soyi/Productivity-Dashboard)

---

_Dayflow — Plan your day. Focus on what matters. Make steady progress._
