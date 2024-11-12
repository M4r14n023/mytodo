import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-4"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={`text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      </div>
      <button
        className="text-red-600 hover:underline"
        onClick={() => onRemove(todo.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default TodoItem;



