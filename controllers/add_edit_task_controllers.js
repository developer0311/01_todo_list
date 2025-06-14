import pg from "pg";

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// Add Task Controller
export async function addTask(req, res) {
  const userId = req.session.user.id;
  const { task_details, date, status, priority } = req.body;

  try {
    // Step 1: Check if date already exists for the user
    let result = await db.query(
      "SELECT id FROM dates WHERE user_id = $1 AND date = $2",
      [userId, date]
    );

    let dateId;
    if (result.rows.length > 0) {
      dateId = result.rows[0].id;
    } else {
      // Insert new date record
      const insertDate = await db.query(
        "INSERT INTO dates (user_id, date) VALUES ($1, $2) RETURNING id",
        [userId, date]
      );
      dateId = insertDate.rows[0].id;
    }

    // Step 2: Insert the new task
    await db.query(
      `INSERT INTO tasks (user_id, date_id, task_details, status, priority)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, dateId, task_details.trim(), status, priority]
    );

    res.redirect("/tasks");
  } catch (err) {
    console.error("Error adding task:", err);
    res.redirect("/tasks?error=Could not add task");
  }
}

// Edit Task Controller
export async function editTask(req, res) {
  const userId = req.session.user.id;
  const taskId = req.params.taskId; // using taskId from route as per router.post("/edit/:taskId", ...)
  const { task_details, date, status, priority } = req.body;

  try {
    // Step 1: Ensure the date exists for the user
    const result = await db.query(
      "SELECT id FROM dates WHERE user_id = $1 AND date = $2",
      [userId, date]
    );

    let dateId;
    if (result.rows.length > 0) {
      dateId = result.rows[0].id;
    } else {
      const insertDate = await db.query(
        "INSERT INTO dates (user_id, date) VALUES ($1, $2) RETURNING id",
        [userId, date]
      );
      dateId = insertDate.rows[0].id;
    }

    // Step 2: Update the task
    await db.query(
      `UPDATE tasks
       SET date_id = $1,
           task_details = $2,
           status = $3,
           priority = $4,
           updated_at = NOW()
       WHERE id = $5 AND user_id = $6`,
      [dateId, task_details.trim(), status, priority, taskId, userId]
    );

    res.redirect("/tasks");
  } catch (err) {
    console.error("Error editing task:", err);
    res.redirect("/tasks?error=Could not update task");
  }
}

// Mark Task as Complete Controller
export async function completeTask(req, res) {
  const userId = req.session.user.id;
  const taskId = req.params.taskId;

  try {
    // Ensure the task belongs to the logged-in user
    const result = await db.query(
      `UPDATE tasks
       SET status = 'done', updated_at = NOW()
       WHERE id = $1 AND user_id = $2`,
      [taskId, userId]
    );

    // Optional: Check if any rows were affected (i.e., task existed and belonged to user)
    if (result.rowCount === 0) {
      return res.redirect("/tasks?error=Task not found or unauthorized");
    }

    res.redirect("/tasks");
  } catch (err) {
    console.error("Error completing task:", err);
    res.redirect("/tasks?error=Could not mark task as complete");
  }
}

