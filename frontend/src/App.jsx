import { useState } from "react";
import { CreateTask } from "./components/CreateTask";
import { TaskList } from "./components/TaskList";
import "./index.css";

function App() {
  const [updateTask, setUpdateTask] = useState(false);

  return (
    <>
      <CreateTask onCreateTask={() => setUpdateTask((prev) => !prev)} />
      <div className="flex justify-around my-10">
        <div className="flex-initial w-[40%]">
          <TaskList updateTaskList={updateTask} />
        </div>
      </div>
    </>
  );
}

export default App;
