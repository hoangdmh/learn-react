import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import "./todo.css";
import reactLogo from "../../assets/react.svg";

import { useState } from "react";

const ToDoApp = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (name) => {
    console.log("Add new todo", name);
    const newTodo = {
      id: randomIntFromInterval(100, 900),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleDelete = (id) => {
    // console.log("first delete", id);
    let todoListCopy = todoList;
    todoListCopy = todoListCopy.filter((item) => item.id !== id);
    setTodoList(todoListCopy);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />
      {todoList && todoList.length > 0 ? (
        <TodoData todoList={todoList} handleDelete={handleDelete} />
      ) : (
        <div className="todo-image">
          <img src={reactLogo} className="logo" />
        </div>
      )}
    </div>
  );
};

export default ToDoApp;
