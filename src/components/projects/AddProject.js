import { useState } from "react";
import { firebase } from "../../lib/firebase";
import { generatePushId } from "../../helpers";
import { useProjectsValue } from "../../context";

export default function AddProject({ shouldShow = false }) {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: "Xlff7deIcRUcMOCnb8pLEg8QkTU2",
        })
        .then(() => {
          setProjects([]);
          setProjectName("");
          setShow(false);
        });
  };

  return (
    <div className="mt-4">
      <div
        onClick={() => setShow((show) => !show)}
        className="flex items-baseline px-2 my-2 pb-1.5 space-x-3 cursor-pointer hover:bg-gray-light"
      >
        <span className="text-maroon font-bold text-2xl">+</span>
        <span className="">Add Project</span>
      </div>

      {show && (
        <div className="px-3">
          <input
            type="text"
            value={projectName}
            onChange={({ target }) => setProjectName(target.value)}
            className="px-2 py-1 my-2 border border-gray-primary bg-white focus:outline-none"
            placeholder="Name your project"
          />
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="bg-maroon text-white px-2.5 py-1 mt-2"
              onClick={addProject}
            >
              Add Project
            </button>
            <button
              type="button"
              className="bg-gray-light px-3 py-1 mt-2"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}