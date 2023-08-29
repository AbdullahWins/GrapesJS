import { useState } from "react";
import PropTypes from "prop-types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TodoItem = ({ id, content, index, moveTodo, editTodo, deleteTodo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (dragged) => {
      if (dragged.index !== index) {
        moveTodo(dragged.index, index);
        dragged.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={(node) => drop(drag(node))}
      style={{ opacity }}
      className="w-1/3 p-4 border rounded-md bg-purple-400 shadow-md cursor-pointer mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold">{content}</span>
        <div className="flex space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => editTodo(id)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: "todo-1", content: "Buy groceries" },
    { id: "todo-2", content: "Walk the dog" },
    { id: "todo-3", content: "Finish coding project" },
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
      <div className="flex justify-center mx-auto mt-8">
        <div className="flex flex-wrap -mx-4">
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
          <div className="w-1/3 p-4 border rounded-md bg-gray-200 shadow-md cursor-pointer mb-4">
            <button
              className="text-gray-600 hover:text-gray-800"
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

export default TodoList;
