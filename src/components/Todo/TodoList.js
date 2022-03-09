import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./TodoList.module.css";
import * as actionTypes from "../store/actions"

const TodoList = () => {
  const notes = useSelector((state) => state);
  const [filteredValue, setFilteredValue] = useState();
  const [filterList, setFilterList] = useState(notes);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

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
        notes.filter((item) => item.done === !!filteredValue));
    }
    else if (filteredValue === "false") {
      setFilterList(
        notes.filter((item) => item.done !== !!filteredValue));
    }
    else {
      setFilterList(notes);
    }
  }, [filteredValue, notes]);

  useEffect(() => {
    if (search === '') {
      setFilterList(notes);
    } else {
      setFilterList(notes.filter((note) => note.title.includes(search)));
    }
  }, [search, notes]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };


  const filterHandler = (e) => {
    setFilteredValue(e.target.value);
  }

  return (
    <div className={classes.todos}>
      <label htmlFor="search">Search from todos: </label>
      <input type="search" id="search" onChange={searchHandler} />
      <h1>Notes:</h1>
      <select name="done" defaultValue="all" onChange={filterHandler}>
        <option value="true">Done</option>
        <option value="false">Not done</option>
        <option value="all">All</option>
      </select>
      {!notes && <p>Please add some notes first</p>}

      {filterList?.map((note) => {
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
      })}
    </div>
  );
};

export default TodoList;