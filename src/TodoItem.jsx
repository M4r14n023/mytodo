import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-4"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}  // Asegúrate de que 'onToggle' esté bien definido
        />
        <span className={`text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}  {/* Muestra el texto de la tarea */}
        </span>
      </div>
      <button
        className="text-red-600 hover:underline"
        onClick={() => onRemove(todo.id)}  // Asegúrate de que 'onRemove' esté bien definido
      >
        Eliminar
      </button>
    </div>
  );
};

export default TodoItem;




