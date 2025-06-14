
# 📝 Scheduly — Smart, Date-Based To-Do List App

Scheduly is a modern, lightweight to-do list web application that helps users manage their daily tasks in a clean, structured, and date-specific format. Designed with simplicity and functionality in mind, Scheduly supports **multi-user environments**, **task categorization**, **status tracking**, and **daily remarks**—all organized around calendar dates.

---

## 📌 Key Features

### ✅ Multi-User System

* Each user has their own account and isolated task environment.
* Personalized views and filters based on the user's task history and calendar.

### 📅 Date-Based Task Management

* Tasks are grouped and managed per day.
* Each calendar date can include optional **remarks or notes** (daily summary, tags, reflections, etc.).

### ✍️ Task Functionality

* Add, update, and delete tasks for a specific day.
* Each task supports:

  * **Status tracking**: `pending`, `in-progress`, or `done`
  * **Priority levels**: High, Medium, Low
  * Optional task filters (status, priority, date)

### 📋 Filters & Sorting

* Filter tasks by status (`pending`, `in-progress`, `done`, or `all`)
* Sort tasks by creation date (`oldest first`, `newest first`)
* Search tasks by calendar date

### 🔖 Daily Remarks (Pending Feature)

* Add personal notes or tags to each calendar day (e.g., "Meeting day", "Weekend", "Project deadline").
* Useful for journaling or thematic task grouping.

---


## 🧠 Application Philosophy

Scheduly is more than just a list of things to do—it's built around the **concept of productivity on a calendar**. You can:

* **Reflect on your day** using remarks
* **Organize tasks meaningfully** with status & priority
* **Visualize progress** over time

Ideal for personal use, student planners, and productivity-focused professionals.

---

## 🔐 Authentication (Optional)

While the core app is designed to support multiple users, authentication (login/registration) can be added using:

* Session-based auth (e.g., `express-session`)

---

## 🚀 Planned Enhancements

* 📆 Calendar view for navigating between days
* 🔁 Recurring tasks (daily, weekly, monthly)
* ⏰ Time-specific deadlines (e.g., 5 PM reminders)
* 👥 Task sharing & collaboration
* 🏷️ Tag-based task filtering (e.g., “work”, “study”)
* 📊 Productivity dashboard & analytics

---

## 🧪 Example User Flow

1. **Sign up / Login**
2. **Add daily tasks** for today or a future date
3. **Mark tasks as done** as you complete them
4. **Edit or delete tasks** anytime
5. **Use filters** to focus on specific task types or days
6. **Add a remark** for a completed day
7. **Log out and return later** — all your data remains organized

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express
* **Frontend**: EJS templating, Bootstrap UI
* **Database**: PostgreSQL (via pg module)
* **Other**: Form handling, status filtering, date formatting, client-side JS

---

## 📚 Schema Overview

The app supports:

* ✅ Multiple users
* 📅 Multiple tasks per date
* ✍️ Remarks for each date
* 🔗 Clear relationships between users, dates, and tasks

---

## 💡 Why Use Scheduly?

Whether you're a student managing study goals, a freelancer juggling client work, or a productivity nerd who just loves order—**Scheduly gives you structure without friction**.

> Focus on your day, one task at a time.

---

## 👨‍💻 Contributing

If you'd like to contribute ideas or improvements:

1. Fork the repo
2. Create a new feature branch
3. Submit a pull request with a detailed description

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, distribute, and sublicense this project for personal or commercial use, provided the original copyright and license
notice are included in all copies or substantial portions of the Software.

