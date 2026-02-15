import React, { useState } from "react";
import TodoItem from "../Components/TodoItem";
import { initialTodos } from "../Interfaces/todoModel";

const HomePage = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState("");

  const columns = [
    {
      id: "todo",
      title: "To Do 🚀",
      textColor: "text-pink-400",
      borderColor: "border-t-pink-500",
    },
    {
      id: "doing",
      title: "Doing ⚡",
      textColor: "text-yellow-400",
      borderColor: "border-t-yellow-400",
    },
    {
      id: "done",
      title: "Done 🎉",
      textColor: "text-green-400",
      borderColor: "border-t-green-400",
    },
  ];

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditValue(task.text);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setEditValue("");
  };

  const saveEditTodo = () => {
    if (!editValue.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === editingTask.id ? { ...todo, text: editValue } : todo,
      ),
    );
    closeEditModal();
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), text: inputValue, status: "todo" };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetStatus) => {
    let id = e.dataTransfer.getData("id");
    id = parseInt(id);
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, status: targetStatus } : task,
      ),
    );
  };

  return (
    <div className="min-h-screen gradient-bg p-8 font-sans text-gray-200 relative">
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto mb-14">
          <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 drop-shadow-sm">
            ToDo Let’s
          </h1>

          <form
            onSubmit={addTodo}
            className="flex gap-4 bg-slate-800/50 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md"
          >
            <input
              type="text"
              className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-500/30 text-white placeholder-purple-300/30 transition-all font-mono"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-md">
              ADD
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, column.id)}
              className={`bg-slate-800/40 p-5 rounded-2xl min-h-[400px] flex flex-col border-t-4 ${column.borderColor} shadow-xl backdrop-blur-md border-x border-b border-white/5 transition-colors`}
            >
              <h2
                className={`text-2xl font-black mb-6 text-center ${column.textColor} tracking-wider uppercase drop-shadow-sm`}
              >
                {column.title}
              </h2>
              <div className="flex-1 space-y-4">
                {todos
                  .filter((t) => t.status === column.id)
                  .map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      deleteTodo={deleteTodo}
                      openEditModal={openEditModal}
                      onDragStart={onDragStart}
                    />
                  ))}
                {todos.filter((t) => t.status === column.id).length === 0 && (
                  <div className="h-full flex items-center justify-center opacity-30">
                    <p className="text-center text-gray-400 text-sm italic border-2 border-dashed border-white/20 rounded-xl p-6 w-full font-mono">
                      Drop items here
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-md animate-fade-in-up">
            <h3 className="text-xl font-bold text-purple-400 mb-4">
              Update Task
            </h3>
            <input
              type="text"
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl p-4 outline-none focus:border-purple-400/50 text-white font-mono mb-6"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-5 py-2.5 rounded-xl text-gray-300 hover:bg-white/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEditTodo}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold shadow-md transition-transform active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
