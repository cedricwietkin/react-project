"use client"



import React, { useState, useEffect, useRef } from 'react';
import "./todo.scss";
import Link from 'next/link'


function ToDoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [newTodo, setNewTodo] = useState('');
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
      handleAddTodo(); // Appeler la fonction handleAddTodo lorsqu'Enter est pressé
    }
  };


  const handleCheckboxChange = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    // Handle editing todo item
    console.log('Edit todo:', index);
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
    
    <div className='switch'>
    <Link href="/">Pomodoro</Link>
    <Link href="/todo">To-do</Link>
    </div> 
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
            <p>Edit/Delete</p>
          </div>
          <ul className="list">
            {todos.map((todo, index) => (
              <li key={index} className="todo_item">
                <input
                  className="todo_checkbox"
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                />
                <span className="todo_value">{todo.value}</span>
                <span className="todo_date">{todo.date}</span>
                <div className="todo_iconB">
                  <button
                    className="todo_iconButton"
                    onClick={() => handleEditTodo(index)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="todo_iconButton"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    <i className="fas fa-trash"></i>
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
