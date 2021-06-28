import { useCallback, useEffect } from "react";
import { useProjectsValue } from "../../context";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  anchorRef,
}) => {
  const { projects } = useProjectsValue();

  const handleKeydown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setShowProjectOverlay(false);
      }
    },
    [setShowProjectOverlay]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    projects &&
    showProjectOverlay && (
      <div
        ref={anchorRef}
        className="absolute -right-4 rounded-md border border-gray-primary bg-white shadow-md w-1/3 top-24"
      >
        <ul className="">
          {projects.map((project) => (
            <li
              className="p-2 px-4 border-b border-gray-primary hover:bg-gray-light font-normal hover:font-bold cursor-pointer"
              key={project.projectId}
            >
              <div
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};