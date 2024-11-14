import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Cargar tareas desde el backend al inicio
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };
    fetchTodos();
  }, []);

  // Función para agregar una nueva tarea
  const addTodo = async (text) => {
    try {
      const response = await axios.post('/api/todos', { text });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;




