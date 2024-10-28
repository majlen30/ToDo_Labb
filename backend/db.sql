CREATE TABLE categories (
  category_id serial PRIMARY KEY,
  category_name text UNIQUE NOT NULL
);

CREATE TABLE tasks (
  task_id serial PRIMARY KEY,
  task_name TEXT NOT NULL,
  task_completed BOOLEAN NOT NULL,
  task_category INTEGER NOT NULL,
  FOREIGN KEY(task_category) REFERENCES categories(category_id)
);

INSERT INTO categories (category_name) VALUES
('Arbete'),
('Fritid'),
('Skola');

INSERT INTO tasks (task_name, task_category, task_completed) VALUES
('Äta på restaurang', 2, false),
('Workshop', 1, true);
