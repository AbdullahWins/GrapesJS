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
      className="w-72 h-72 p-4 border rounded-md bg-gray-100 shadow-md cursor-pointer"
    >
      <div className="h-full flex flex-col justify-between items-center gap-6 bg-white rounded-lg">
        <p className="text-lg font-bold">{content}</p>
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
