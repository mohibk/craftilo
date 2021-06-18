import { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import { firebase } from "../../lib/firebase";
import { useSelectedProjectValue } from "../../context";
import { format, add } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import QuickTaskModal from "./QuickTaskModal";
import { ProjectOverlay } from "./ProjectOverlay";
// import ProjectOverlay from "./ProjectOverlay";
// import TaskDate from "./TaskDate";

export default function AddTask({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";
    const taskId = uuidv4();

    if (projectId === "TODAY") {
      collatedDate = format(new Date(), "yyyy, M, dd");
    } else if (projectId === "NEXT_7") {
      collatedDate = format(add(new Date(), { days: 7 }), "yyyy, M, dd");
    }
    console.log("collatedDate", collatedDate);

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          taskId,
          date: collatedDate || taskDate,
          userId: "Xlff7deIcRUcMOCnb8pLEg8QkTU2",
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain(false);
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={`mt-5 ${
        showQuickAddTask ? "add-task add-task__overlay" : "add-task"
      }`}
    >
      {showAddTaskMain && (
        <div className="mx-4 mb-4">
          <div
            onClick={() => setShowMain((showMain) => !showMain)}
            className="flex items-baseline space-x-3 cursor-pointer"
          >
            <span className="text-2xl text-maroon">+</span>
            <span className="">Add Task</span>
          </div>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="relative">
          {/* {showQuickAddTask && <QuickTaskModal />} */}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          {/* <TaskDate /> */}

          <input
            type="text"
            placeholder="New Task"
            className="w-full border border-gray-primary mx-4 px-2 py-0.5 my-2"
            value={task}
            onChange={({ target }) => setTask(target.value)}
          />

          <div className="flex items-center justify-between px-4">
            <span className="items-center space-x-4">
              <button
                className="bg-maroon text-white px-2.5 py-1 mt-2"
                onClick={addTask}
              >
                Add Task
              </button>

              {!showQuickAddTask && (
                <button
                  className="bg-gray-light px-3 py-1 mt-2"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </span>
            <span className="flex items-baseline space-x-4">
              <span
                className="cursor-pointer"
                onClick={() =>
                  setShowProjectOverlay(
                    (showProjectOverlay) => !showProjectOverlay
                  )
                }
              >
                <FaRegListAlt />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setShowTaskDate((showTaskDate) => !showTaskDate)}
              >
                <FaRegCalendarAlt />
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}