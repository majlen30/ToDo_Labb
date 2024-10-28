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

INSERT INTO tasks (task_name, task_category) VALUES
('Boka möte', 1),
('Prov', 3);

INSERT INTO tasks (task_name, task_category, task_completed) VALUES
('Äta på restaurang', 2, false),
('Workshop', 1, true);

SELECT task_name, category_name, task_completed FROM tasks INNER JOIN categories task_category = category_id;
