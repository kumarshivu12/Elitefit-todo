import React, { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Input } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ onClose, editId }) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "high",
    status: "Upcoming",
    date: currentDate,
  });

  useEffect(() => {
    if (editId) {
      const tasksFromStorage = JSON.parse(localStorage.getItem("list")) || [];
      setTask(() => {
        const task = tasksFromStorage.find((t) => t.id === editId);
        console.log(task);
        return task;
      });
    } else {
      setTask({
        title: "",
        description: "",
        priority: "high",
        status: "",
        date: currentDate,
      });
    }
  }, [editId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    const tasksFromStorage = JSON.parse(localStorage.getItem("list")) || [];
    let newTask;
    if (editId) {
      const i = tasksFromStorage.findIndex((t) => t.id == editId);
      newTask = tasksFromStorage;
      newTask[i].title = task.title;
      newTask[i].description = task.description;
      newTask[i].date = task.date;
      newTask[i].priority = task.priority;
      newTask[i].status = task.status;
      localStorage.setItem("list", JSON.stringify([...newTask]));
    } else {
      newTask = {
        ...task,
        id: uuidv4(),
      };
      localStorage.setItem(
        "list",
        JSON.stringify([...tasksFromStorage, newTask])
      );
    }
    setTask({
      title: "",
      description: "",
      priority: "high",
      status: "",
      date: currentDate,
    });
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handlePriorityChange = (e) => {
    setTask({
      ...task,
      priority: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    console.log(date);
    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate < today) {
      setTask({
        ...task,
        date: date,
        status: "Overdue",
      });
    } else {
      setTask({
        ...task,
        date: date,
        status: "Upcoming",
      });
    }
  };
  return (
    <div className="w-full ">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            required="true"
            className="block w-full p-2.5  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Title..."
            name="title"
            value={task.title}
            onChange={handleInputChange}
          />
          <Datetime
            closeOnSelect={true}
            onChange={(e) => {
              handleDateChange(e);
            }}
            value={task.date}
            isValidDate={(current, selected) => {
              var yesterday = moment().subtract(1, "day");
              return current.isAfter(yesterday);
            }}
            renderInput={(props, openCalendar, closeCalendar) => {
              return <Input {...props} placeholder="Due Date" />;
            }}
          />
        </div>
        <textarea
          id="message"
          rows={5}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Description..."
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
        <div className="flex gap-2 items-center">
          <h3 className="text-md">Priority: </h3>
          {["high", "medium", "low"].map((prio) => (
            <div key={prio}>
              <input
                id={`inline-${prio}-radio`}
                type="radio"
                value={prio}
                checked={task.priority === prio}
                onChange={handlePriorityChange}
                name="priority"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor={`inline-${prio}-radio`}
                className="ms-2 text-sm font-medium text-gray-900"
              >
                {prio.charAt(0).toUpperCase() + prio.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {editId ? "Save" : "Add"} Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
