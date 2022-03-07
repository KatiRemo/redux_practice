import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import classes from "./TodoList.module.css";
import * as actionTypes from "../store/actions"


const TodoList = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [filteredValue, setFilteredValue] = useState();
  const [filterList, setFilterList] = useState(notes);
  const [search, setSearch] = useState("");

  const removeHandler = (id) => {
    dispatch({
      type: actionTypes.REMOVE_TODO,
      payload: id,
    });
  };

  const doneHandler = (id) => {
    dispatch({
      type: actionTypes.DONE_TODO,
      payload: id,
    });
  };

  useEffect(() => {
    if (filteredValue === "true") {
      setFilterList(
        notes.filter((item) => item.done === !!filteredValue)
      );
    }
    else if (filteredValue === "false") {
      setFilterList(
        notes.filter((item) => item.done !== !!filteredValue)
      );
    }
    else {
      setFilterList(notes);
    }
  }, [filteredValue, notes]);

  const filterHandler = (e) => {
    setFilteredValue(e.target.value);
  }

  return (
    <div className={classes.todos}>
      <h1>Notes:</h1>
      <select name="done" defaultValue="all" onChange={filterHandler}>
        <option value="true">Done</option>
        <option value="false">Not done</option>
        <option value="all">All</option>
      </select>
      <br></br>
      <label><strong>Search tasks </strong></label><input id="search" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
      {console.log(search)}
      {filterList.map((note) => {
         if(
          note.title.toLowerCase().includes(search) ||
          note.task.toLowerCase().includes(search)
        ) {
        return (
          <div
            onClick={() => doneHandler(note.id)}
            className={`${classes.todo} ${
              note.done ? classes.done : classes.notDone
            }`}
            key={note.id}
          >
            <h2> {note.title}</h2>
            <p>{note.task}</p>
            <span
              onClick={() => removeHandler(note.id)}
              className={`material-icons ${classes.delete}`}
            >
              delete
            </span>
          </div>
        );
  }})}
    </div>
  );
};

export default TodoList;
