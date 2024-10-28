// import "./App.css";
import "./index.css";
import { CreateTask } from "./components/CreateTask";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <>
      <CreateTask />
      <div className="flex justify-around my-10">
        <div className="flex-initial w-[40%]">
          <TaskList />
        </div>
        <div className="flex-initial w-[40%]">
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
