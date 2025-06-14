import passport from "passport";
import pg from "pg";
import "dotenv/config";

// ====================== DATABASE CONNECTION ====================== //

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();



// ====================== PAGE CONTROLLERS ====================== //

// Home Page
export async function showHomePage(req, res) {
  try {
    res.render("index", {title: ""}); // Render the index page
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send("Error loading homepage"); // Send a generic error message
  }
}

// Register Page
export async function showRegisterPage(req, res) {
  try {
    // If the user is already authenticated, redirect them to the tasks page or any other page
    if (req.session && req.session.user) {
      return res.redirect("/tasks"); // Redirect to the page where authenticated users should go
    }

    const error = req.query.error; // Extract error message from query params
    res.render("register", { title: "Register", error }); // Render the register page
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send("Error loading register page"); // Send a generic error message
  }
}

// Login Page
export async function showLoginPage(req, res) {
  try {
    // If the user is already authenticated, redirect them to the tasks page or any other page
    if (req.session && req.session.user) {
      return res.redirect("/tasks"); // Redirect to the page where authenticated users should go
    }
    const error = req.query.error; // Extract error message from query params
    const success = req.query.success; // Extract success message from query params
    res.render("login", { title: "Login", error, success });
  } catch (err) {
    res.status(500).send("Error loading login page");
  }
}


// =========================== GET /tasks =========================== //

export async function showTasksPage(req, res) {

  // if (!req.session.subscribed) {
  //     return res.redirect("/login"); // Redirect to the page where authenticated users should go
  // }

  const userId = req.session.user.id;

  const status = req.query.status || "pending";
  const sort = req.query.sort === "newest" ? "DESC" : "ASC";
  const date = req.query.date;

  try {
    let baseQuery = `
      SELECT tasks.*, dates.date FROM tasks
      JOIN dates ON tasks.date_id = dates.id
      WHERE tasks.user_id = $1
    `;
    const values = [userId];
    let count = 2;

    if (status !== "all") {
      baseQuery += ` AND tasks.status = $${count++}`;
      values.push(status);
    }

    if (date) {
      baseQuery += ` AND dates.date = $${count++}`;
      values.push(date);
    }

    baseQuery += ` ORDER BY tasks.created_at ${sort}`;

    const result = await db.query(baseQuery, values);
    const tasks = result.rows;

    // Check if request is from fetch (AJAX)
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      // Render a partial EJS snippet and send it back
      return res.render("partials/task_list", { tasks }, (err, html) => {
        if (err) {
          console.error("Partial render error:", err);
          return res.status(500).json({ error: "Rendering error" });
        }
        res.json({ html });
      });
    }

    // Full page render (non-AJAX request)
    res.render("tasks", { title: "Tasks",  tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(500).json({ error: "Failed to load tasks" });
    }

    res.render("tasks", {  title: "Tasks", tasks: [], error: "Failed to load tasks" });
  }
}


export async function addEditPage(req, res) {

  const userId = req.session.user.id;
  const taskId = req.params.id; // undefined for "add", present for "edit"

  try {
    // Get user's available dates for dropdown
    const dateResult = await db.query(
      "SELECT id, date FROM dates WHERE user_id = $1 ORDER BY date ASC",
      [userId]
    );
    const dates = dateResult.rows;

    if (taskId) {
      // Editing - fetch the task
      const taskResult = await db.query(
        `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
        [taskId, userId]
      );

      if (taskResult.rows.length === 0) {
        return res.redirect("/tasks?error=Task not found");
      }

      const task = taskResult.rows[0];

      return res.render("add_edit_task", {
        title: "Edit old task",
        edit: true,
        task,
        dates,
      });
    } else {
      // Adding - no task to load
      return res.render("add_edit_task", { 
        title: "Add new task",
        edit: false,
        task: null,
        dates,
      });
    }
  } catch (err) {
    console.error("Error loading add/edit task page:", err);
    res.redirect("/tasks?error=Something went wrong");
  }
}
