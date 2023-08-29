import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoItem from "../components/TodoItem";

const ToDo = () => {
  const [todos, setTodos] = useState([
    { id: "todo-1", content: "Buy groceries" },
    { id: "todo-2", content: "Walk the dog" },
    { id: "todo-3", content: "Finish coding project" },
    { id: "todo-4", content: "Review code" },
    { id: "todo-5", content: "open pull request" },
  ]);

  const addTodo = () => {
    const newTodo = prompt("Enter a new todo:");
    if (newTodo) {
      const newTodos = [
        ...todos,
        { id: `todo-${todos.length + 1}`, content: newTodo },
      ];
      setTodos(newTodos);
    }
  };

  const editTodo = (id) => {
    const updatedContent = prompt(
      "Edit todo:",
      todos.find((todo) => todo.id === id).content
    );
    if (updatedContent !== null) {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, content: updatedContent } : todo
      );
      setTodos(newTodos);
    }
  };

  const deleteTodo = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirmation) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const moveTodo = (fromIndex, toIndex) => {
    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, movedTodo);
    setTodos(newTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center items-center mx-auto p-16">
        <div className="flex justify-center items-center flex-wrap -mx-4 gap-6">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              content={todo.content}
              index={index}
              moveTodo={moveTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
          <div className="border rounded-md bg-gray-200 shadow-md cursor-pointer mb-4">
            <button
              className="w-72 h-72 p-4 text-gray-600 hover:text-gray-800"
              onClick={addTodo}
            >
              + Add Todo
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ToDo;
