import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar las tareas desde el backend (MongoDB)
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://mytodo-c4mh.onrender.com/api/todos');
        setTodos(response.data);
      } catch (err) {
        setError('Error fetching todos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Dependencia vacía para que solo se ejecute una vez

// Agregar tarea
const handleAdd = async (text) => {
  const newTodo = { text, completed: false };
  try {
    const response = await axios.post('https://mytodo-c4mh.onrender.com/api/todos', newTodo);
    
    // Verifica si el backend ha respondido correctamente con el nuevo todo
    if (response.status === 201) {
      setTodos((prevTodos) => [...prevTodos, response.data]);
    }
  } catch (error) {
    setError('Error adding todo: ' + error.message);
  }
};

  // Marcar tarea como completada o no
  const handleToggle = async (id) => {
    const updatedTodos = todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    // Actualizar en el backend
    const todoToUpdate = updatedTodos.find(todo => todo._id === id);
    try {
      await axios.put(`https://mytodo-c4mh.onrender.com/api/todos/${id}`, todoToUpdate);
    } catch (error) {
      setError('Error updating todo: ' + error.message);
    }
  };

  // Eliminar tarea
  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://mytodo-c4mh.onrender.com/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id)); // Filtramos el estado
    } catch (error) {
      setError('Error deleting todo: ' + error.message);
    }
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Mi aplicación TODO</h1>
      <p className="text-xl text-gray-700 mb-6">¡Bienvenido a mi lista de tareas!</p>

      {loading && <p className="text-lg text-gray-700">Cargando tareas...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}

      <TodoForm onAdd={handleAdd} />

      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    </div>
  );
}

export default App;








