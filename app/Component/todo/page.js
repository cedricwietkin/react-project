"use client"

import React, { useState, useEffect, useRef } from 'react';
import "./todo.scss";

function ToDoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo !== '') {
      const newTodoItem = {
        value: newTodo,
        date: new Date().toISOString().split('T')[0],
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleCheckTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, done: !todo.done, active: !todo.active };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="todo">
        <div className="todo_first">
          <input
            className="todo_input"
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Veuillez rentrer un nouvel élément"
          />
          <button className="todo_button" onClick={handleAddTodo}>
            ajouter
          </button>
        </div>
        <form className="table">
          <div className="category">
            <p></p>
            <p>To-do</p>
            <p>Date</p>
            <p>Check/Delete</p>
          </div>
          <ul className="list">
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`todo_item ${todo.done ? 'todo_item_done' : ''} ${todo.done && todo.active ? 'active' : ''}`}
              >
                <span className="todo_value">{todo.value}</span>
                <span className="todo_date">{todo.date}</span>
                <div className={`todo_iconB ${todo.done && todo.active ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="todo_iconButton todo_check"
                    onClick={() => handleCheckTodo(index)}
                  >
                    <img src="./check.svg" alt="Check" />
                  </button>
                  <button
                    type="button"
                    className="todo_iconButton"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    <img src="./icons8-poubelle.svg" alt="" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </>
  );
}

export default ToDoList;