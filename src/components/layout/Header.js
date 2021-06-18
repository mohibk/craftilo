import { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
// import AddTask from "../AddTask";

export default function Header({ darkMode, setDarkMode }) {
  //   const [shouldShowMain, setShouldShowMain] = useState(false);
  //   const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="bg-maroon fixed w-full">
      <nav className="flex justify-around items-center text-white py-2 text-xl">
        <div className="">
          <h2 className="cursor-pointer">craftilo</h2>
        </div>
        <div className="">
          <ul className="flex items-baseline space-x-3">
            <li
              className="text-3xl cursor-pointer"
              //   onclick={() => {
              //     setShowQuickAddTask(true);
              //     setShouldShowMain(true);
              //   }}
            >
              +
            </li>
            <li
              className=""
              //   onClick={() => setDarkMode((darkMode) => !darkMode)}
            >
              <FaPizzaSlice size="20" className="cursor-pointer" />
            </li>
          </ul>
        </div>
      </nav>

      {/* <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      /> */}
    </header>
  );
}