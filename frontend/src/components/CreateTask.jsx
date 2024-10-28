import { useState } from "react";
import "../index.css";
import { CategoriesDropDown } from "./CategoriesDropDown";
import PropTypes from "prop-types";

CreateTask.propTypes = {
  onCreateTask: PropTypes.func,
};

export function CreateTask({ onCreateTask }) {
  const [taskName, setTaskName] = useState(""),
    [taskCategory, setTaskCategory] = useState(null),
    [resetCategory, setResetCategory] = useState(false),
    [errorValidation, setErrorValidation] = useState(false);

  function handleSubmit(e) {
    console.log("taskCategory", taskCategory);

    e.preventDefault();
    if (taskName && taskCategory) {
      createTask(taskName, false, taskCategory);
      setTaskName("");
      setResetCategory((prev) => !prev);
      setErrorValidation(false);
    } else {
      setErrorValidation(true);
    }
  }

  function createTask(task_name, task_completed, task_category) {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_name, task_completed, task_category }),
    }).then(() => {
      onCreateTask();
    });
  }

  return (
    <section className="flex justify-center p-8 bg-yellow-400">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="username"
              className="text-left block text-sm font-medium leading-6 text-gray-900"
            >
              Lägg till uppgift
            </label>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-500">
                <input
                  onChange={(e) => setTaskName(e.target.value)}
                  value={taskName}
                  id="username"
                  name="username"
                  type="text"
                  className="block w-full rounded-md border-0 bg-white py-2 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-9"
                />
              </div>
              <CategoriesDropDown
                onSelect={setTaskCategory}
                onCreate={resetCategory}
              />
              <button
                type="submit"
                className="ml-2 rounded-md bg-lime-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 h-9"
              >
                Skicka
              </button>
            </div>
            {errorValidation && (
              <p className="text-xs text-red-700">
                Samtliga fält måste vara ifyllda
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
