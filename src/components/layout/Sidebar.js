import { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import Projects from "../projects";
import AddProject from "../projects/AddProject";

export default function Sidebar() {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="col-span-1 border-r border-gray-light mt-10">
      <ul className="">
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            active === "inbox" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setActive("inbox");
            setSelectedProject("INBOX");
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            active === "today" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setActive("today");
            setSelectedProject("TODAY");
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            active === "next_7" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setActive("next_7");
            setSelectedProject("NEXT_7");
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className="flex items-center space-x-3 py-2 px-3 cursor-pointer border-b border-gray-light pb-6"
        onClick={() => setShowProjects((showProjects) => !showProjects)}
      >
        <span onClick={() => setShowProjects((showProjects) => !showProjects)}>
          <FaChevronDown
            className={showProjects ? "" : "transform -rotate-90"}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
}