import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import ListCard from "../components/ListCard";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import TaskModal from "../components/TaskModal";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [tab, setTab] = useState("All");

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleTabChange = (e) => {
    setTab(e);
  };
  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = list.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setList(updatedTasks);
    localStorage.setItem("list", JSON.stringify(updatedTasks));
  };

  const handleDeleteChange = (id) => {
    const updatedTasks = list.filter((task) => task.id !== id);
    setList(updatedTasks);
    localStorage.setItem("list", JSON.stringify(updatedTasks));
  };
  const handleEditChange = (id) => {
    onOpen();
  };
  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem("list")) || [];
    const filteredList = tasksFromStorage.filter((task) => {
      const isInSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.date.toLowerCase().includes(search.toLowerCase());

      const isPriorityMatch = priority ? task.priority === priority : true;

      switch (tab) {
        case "All":
          return isInSearch && isPriorityMatch;
        case "Upcoming":
          return task.status === "Upcoming" && isInSearch && isPriorityMatch;
        case "Overdue":
          return task.status === "Overdue" && isInSearch && isPriorityMatch;
        case "Completed":
          return task.status === "Completed" && isInSearch && isPriorityMatch;
        default:
          return isInSearch && isPriorityMatch;
      }
    });
    setList(filteredList);
  }, [isOpen, search, priority, tab]);

  return (
    <div className="w-full lg:w-[75%] flex flex-col items-center gap-8">
      {/* Top Section  */}
      <div className="text-center">
        <h1 className="text-2xl font-serif font-bold">TODO-LIST</h1>
        <h3 className="text-md font-semibold">{`Welcome {User}`}</h3>
      </div>
      {/* Mid-Section  */}
      <div className="w-full flex justify-between items-center rounded-2xl gap-4 bg-[#ecedf6] px-8 py-4">
        <button
          onClick={onOpen}
          type="button"
          className="flex-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
        >
          Add Task
        </button>

        <div className="flex-1 relative min-w-[40%]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search items..."
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            // onClick={handleSearch}
            className="text-white absolute end-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>

        <select
          id="small"
          value={priority}
          onChange={handlePriorityChange}
          className="flex-3 block p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="">Priority</option>
          <option value="high">High </option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* List-Section  */}
      <div className="w-full rounded-2xl  flex flex-col gap-4 bg-[#ecedf6] px-8 py-4">
        {/* Navbar  */}
        <div className="flex gap-2 justify-between items-center bg-white px-4 py-3 rounded-xl">
          <button
            type="button"
            onClick={() => handleTabChange("All")}
            className="flex-1 bg-gray-300 hover:bg-gray-400  font-medium rounded-lg text-sm text-black px-5 py-2.5"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("Upcoming")}
            className="flex-1 bg-yellow-300 hover:bg-yellow-400  font-medium rounded-lg text-sm text-black px-5 py-2.5"
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("Overdue")}
            className="flex-1 bg-red-300 hover:bg-red-400  font-medium rounded-lg text-sm text-black px-5 py-2.5"
          >
            Overdue
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("Completed")}
            className="flex-1 bg-green-300 hover:bg-green-400  font-medium rounded-lg text-sm text-black px-5 py-2.5"
          >
            Completed
          </button>
        </div>
        {/* Task List  */}
        <ul className="list-none flex flex-col gap-4">
          {list.length > 0 ? (
            list.map((task) => (
              <ListCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteChange}
                onEdit={handleEditChange}
              ></ListCard>
            ))
          ) : (
            <p className="text-center text-md font-semibold font-serif">
              {`No ${tab !== "All" ? tab : ""} Todos`}
            </p>
          )}
        </ul>
      </div>

      {/* Task Modal  */}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onClose={onClose}></TaskForm>
          </ModalBody>
        </ModalContent>
      </Modal> */}
      <TaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}></TaskModal>
    </div>
  );
};

export default HomePage;
