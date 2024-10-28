const cors = require("cors"),
  dotenv = require("dotenv"),
  express = require("express"),
  path = require("path"),
  { Client } = require("pg");

const app = express(),
  port = process.env.PORT || 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get("/api/categories", async (req, res) => {
  const query = `SELECT * FROM categories;`;
  const { rows } = await client.query(query);
  res.send(rows);
});

app.get("/api/tasks", async (req, res) => {
  const query = `SELECT task_id, task_name, category_name, task_completed FROM tasks INNER JOIN categories on task_category = category_id;`;
  const { rows } = await client.query(query);
  res.send(rows);
});

app.post("/api/tasks", async (req, res) => {
  const { task_name, task_completed, task_category } = req.body;

  try {
    const query = `INSERT INTO tasks (task_name, task_completed, task_category) VALUES ($1, $2, $3);`,
      values = [task_name, task_completed, task_category],
      { rows } = await client.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating task", err);
    res.status(500).json({ error: "Error creating task" });
  }
});

app.patch("/api/tasks", async (req, res) => {
  const { completed, id } = req.body;
  try {
    const result = await client.query(
      `UPDATE tasks SET task_completed = $1 WHERE task_id = $2;`,
      [completed, id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}`);
});
