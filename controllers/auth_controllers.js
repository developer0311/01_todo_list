import bcrypt from "bcrypt";
import pg from "pg";

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



// ============================ REGISTER ============================ //

export async function userRegister(req, res) {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.redirect("/register?error=Name and Email are required");
  }

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    let user;

    if (existingUser.rows.length === 0) {

      const result = await db.query(
        `INSERT INTO users (first_name, last_name, email)
         VALUES ($1, $2, $3) RETURNING *`,
        [first_name, last_name, email]
      );

      user = result.rows[0];
    } else {
      return res.redirect("/register?error=Email is already registered");
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name || ""}`,
    };

    res.redirect("/tasks?success=Account created successfully");
  } catch (err) {
    console.error("Registration Error:", err);
    res.redirect("/register?error=Something went wrong");
  }
}


// ============================ LOGIN ============================ //

export async function userLogin(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.redirect("/login?error=Email is required");
  }

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length === 0) {
      return res.redirect("/login?error=Email not registered. Please register first.");
    }

    const user = existingUser.rows[0];

    req.session.user = {
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name || ""}`,
    };

    res.redirect("/tasks");
  } catch (err) {
    console.error("Login error:", err);
    res.redirect("/login?error=Something went wrong");
  }
}




// ============================ LOGOUT ============================ //
export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.redirect("/?error=Could not logout");
    }
    res.redirect("/login?success=Logged out successfully");
  });
}
