import React, { useState } from "react";
import classes from "./AddTodo.module.css";
import Button from "../UI/Button";

const AddTodo = () => {
  const [todo, setTodo] = useState({ title: "", task: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={addHandler} className={classes.input}>
      <div>
        <label>Title</label>
        <input type="text" onChange={changeHandler} />
      </div>
      <div>
        <label>Task</label>
        <input type="text" onChange={changeHandler} />
      </div>
      <Button>Add Task</Button>
    </form>
  );
};

export default AddTodo;
