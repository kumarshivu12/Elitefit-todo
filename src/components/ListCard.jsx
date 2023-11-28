import React from "react";

const ListCard = ({ task,onStatusChange,onDelete,onEdit}) => {
  const handleStatusChange = () => {
    const newStatus = task.status === "Completed" ? "Upcoming" : "Completed";
    onStatusChange(task.id, newStatus);
  };
  const handleDeleteChange=()=>{
    onDelete(task.id)
  }
  const handleEditChange=()=>{
    onEdit(task.id)
  }
  return (
    <>
      <li
        className={`flex justify-between items-center ${task.status==="Completed"?"bg-green-400": "bg-white"} px-4 py-3 rounded-xl`}
      >
        <input
          id="default-checkbox"
          type="checkbox"
          checked={task.status === "Completed"}
          onChange={handleStatusChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
        />
        <div className="flex w-[75%] justify-between items-center">
          <div className="">
            <h3 className="text-md font-bold tracking-tight text-gray-900 ">
              {task.title}
            </h3>
            <p className="text-xs items-center text-gray-400 ">{task.date}</p>
            <p className="font-semibol text-xs text-gray-600 ">
              {task.description}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button onClick={handleEditChange} className="text-white bg-yellow-500 border-0 py-2 px-3 focus:outline-none hover:bg-yellow-600 rounded text-md">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button onClick={handleDeleteChange}  className="text-white bg-red-500 border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded text-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </li>
    </>
  );
};

export default ListCard;
