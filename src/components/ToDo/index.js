import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { Switch, Icon } from "@blueprintjs/core";
import { DisplayContext } from '../../context/Display';

import { v4 as uuid } from 'uuid';

const ToDo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([0]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const [checked, setChecked] = useState(true);
  const display = useContext(DisplayContext);
  console.log('DISPLAY', display);

  const handleChecked = () => {
    setChecked(!checked);
  }

  function addItem(item) {
    // added if statement for minimal prevention of duplicate items
    if (!list.includes(item)) {
      item.id = uuid();
      item.complete = false;
      console.log('NEW ITEM', item);
      setList([...list, item]);
    }
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  // update page title each time list changes
  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      <Icon icon="settings" />
      <Switch checked={checked} label="Show Completed Items" onChange={handleChecked} />

      {/* <DisplayContext.Consumer>      </DisplayContext.Consumer> */}

      {list.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}

    </>
  );
};

export default ToDo;
