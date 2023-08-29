import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TodoItem = ({ id, content, index, moveTodo }) => {
  const [, ref] = useDrag({
    type: "TODO",
    item: { id, index },
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

  return (
    <li ref={(node) => ref(drop(node))} className="todo-item">
      {content}
    </li>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: "todo-1", content: "Buy groceries" },
    { id: "todo-2", content: "Walk the dog" },
    { id: "todo-3", content: "Finish coding project" },
  ]);

  const moveTodo = (fromIndex, toIndex) => {
    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, movedTodo);
    setTodos(newTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            content={todo.content}
            index={index}
            moveTodo={moveTodo}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

export default TodoList;
