import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos = [], onToggle, onRemove }) => {
  return (
    <ul className="w-full max-w-lg space-y-4">
      {Array.isArray(todos) && todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onRemove={onRemove} />
        ))
      ) : (
        <p>No hay tareas para mostrar.</p>
      )}
    </ul>
  );
};

export default TodoList;





