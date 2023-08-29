import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";

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
      className="w-1/3 p-4 border rounded-md bg-white shadow-md cursor-pointer mb-4"
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

export default TodoItem;
