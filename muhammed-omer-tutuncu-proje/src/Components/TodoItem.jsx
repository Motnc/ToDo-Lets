import React from "react";

const TodoItem = ({ todo, deleteTodo, openEditModal, onDragStart }) => {
  const getBorderColor = () => {
    switch (todo.status) {
      case "todo":
        return "border-l-pink-500";
      case "doing":
        return "border-l-yellow-400";
      case "done":
        return "border-l-green-400";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, todo.id)}
      className={`bg-slate-800/80 hover:bg-slate-700/80 p-4 rounded-xl mb-4 border-l-[6px] ${getBorderColor()} cursor-grab active:cursor-grabbing transition-all duration-200 group shadow-md backdrop-blur-sm border border-white/5`}
    >
      <div className="flex justify-between items-start gap-3">
        <p className="text-gray-200 font-medium text-sm flex-1 break-words leading-relaxed font-mono tracking-tight">
          {todo.text}
        </p>

        <div className="flex flex-col gap-2 ml-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openEditModal(todo)}
            className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors shadow-sm"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
