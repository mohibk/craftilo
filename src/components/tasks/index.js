import { useEffect } from "react";
import { useTasks } from "../../hooks";
import Checkbox from "./Checkbox";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue } from "../../context";
import { useProjectsValue } from "../../context";
import AddTask from "./AddTask";

export default function Tasks() {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject)?.name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject)?.name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className="px-0 md:px-10 pt-10 border-r border-gray-light col-span-4 md:col-span-3 h-screen bg-white">
      <h2 className="text-xl ml-4">{projectName}</h2>
      <ul className="">
        {tasks.map((task) => (
          <li
            className="flex items-center space-x-3 text-lg cursor-pointer border-b border-gray-primary m-2 px-2 py-1 pb-2"
            key={task.docId}
          >
            <Checkbox id={task.docId} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
}
