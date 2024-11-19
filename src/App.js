import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Cargar tareas desde localStorage al inicio
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Función para agregar una nueva tarea
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Función para marcar tarea como completada o no
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Función para eliminar una tarea
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  );
};

export default App;










