import { format, add } from "date-fns";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";

export default function TaskDate({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
  showQuickAddTask,
}) {
  return (
    <>
      {showTaskDate && (
        <div
          className={`absolute -right-4 border border-gray-primary bg-white shadow-md ${
            showQuickAddTask ? "w-1/2 top-28" : "w-1/3 top-24"
          }`}
        >
          <ul>
            <li
              className="flex items-center space-x-2 p-2 pl-4 border-b border-gray-primary hover:bg-gray-light font-normal hover:font-bold cursor-pointer"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(format(new Date(), "yyyy, M, dd"));
              }}
            >
              <span>
                <FaSpaceShuttle />
              </span>
              <span>Today</span>
            </li>
            <li
              className="flex items-center space-x-2 p-2 pl-4 border-b border-gray-primary hover:bg-gray-light font-normal hover:font-bold cursor-pointer"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(
                  format(add(new Date(), { days: 1 }), "yyyy, M, dd")
                );
              }}
            >
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </li>
            <li
              className="flex items-center space-x-2 p-2 pl-4 border-b border-gray-primary hover:bg-gray-light font-normal hover:font-bold cursor-pointer"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(
                  format(add(new Date(), { days: 7 }), "yyyy, M, dd")
                );
              }}
            >
              <span>
                <FaRegPaperPlane />
              </span>
              <span>Next Week</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}