import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Agregar una nueva tarea..."
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TodoForm;




