import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>Eliminar</button>
    </li>
  );
};

export default TodoItem;
  




