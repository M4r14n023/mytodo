import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  // Cargar las tareas desde el backend (MongoDB)
  useEffect(() => {
    axios.get('https://mytodo-c4mh.onrender.com/api/todos') // Cambia por tu URL de backend
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []); 

  // Agregar tarea
  const handleAdd = (text) => {
    const newTodo = { text, completed: false };
    axios.post('https://mytodo-c4mh.onrender.com/api/todos', newTodo)
      .then(response => {
        setTodos([...todos, response.data]); // Agregar la tarea recién creada al estado
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  // Marcar tarea como completada o no
  const handleToggle = (id) => {
    const updatedTodos = todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    // Actualizar en el backend
    const todoToUpdate = updatedTodos.find(todo => todo._id === id);
    axios.put(`https://mytodo-c4mh.onrender.com/api/todos${id}`, todoToUpdate)
      .catch(error => console.error('Error updating todo:', error));
  };

  // Eliminar tarea
  const handleRemove = (id) => {
    axios.delete(`https://mytodo-c4mh.onrender.com/api/todos${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id)); // Eliminar del estado local
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Mi aplicación TODO</h1>
      <p className="text-xl text-gray-700 mb-6">¡Bienvenido a mi lista de tareas!</p>

      <TodoForm onAdd={handleAdd} />

      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
}

export default App;







