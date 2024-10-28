const cors = require("cors"),
  dotenv = require("dotenv"),
  express = require("express"),
  path = require("path"),
  { Client } = require("pg");

const app = express(),
  port = process.env.PORT || 3000;
dotenv.config();

app.use(cors());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get("/api", async (req, res) => {
  const query = `SELECT task_id, task_name, category_name, task_completed FROM tasks INNER JOIN categories on task_category = category_id;`;
  const { rows } = await client.query(query);
  res.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

// const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}`);
});
