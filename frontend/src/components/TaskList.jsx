import { useEffect, useState } from "react";
import { CategoriesDropDown } from "./CategoriesDropDown";

export function TaskList() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        setTasks(result);
      });
  }, []);

  return (
    <section className="bg-stone-100 p-10 rounded">
      <div className="flex justify-center">
        <CategoriesDropDown />
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {tasks &&
          tasks.map((task) => (
            <li
              key={task.task_id}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {task.task_name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {task.category_name}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-center space-x-2">
                <input type="checkbox" checked={task.task_completed} />
                <button className="text-sm font-semibold hover:underline">
                  Ta bort
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
