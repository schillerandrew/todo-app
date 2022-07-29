import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { DisplayContext } from '../../context/Display';
import List from '../List/index.js';

import { v4 as uuid } from 'uuid';

const ToDo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const [checked, setChecked] = useState(true);
  const display = useContext(DisplayContext);
  console.log('LIST', list);

  // const handleChecked = () => {
  //   setChecked(!checked);
  //   // setShowCompleted(false);
  // }

  function addItem(item) {
    // added if statement for minimal prevention of duplicate items
    if (!list.includes(item)) {
      item.id = uuid();
      item.complete = false;
      // console.log('NEW ITEM', item);
      setList([...list, item]);
    }
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function updateItem(id, data) {
    

    const updatedItems = list.map(item => item.id === id ? {...item, ...data} : item);
    setList(updatedItems);
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

      
      {/* <Switch checked={checked} label="Show Completed Items" onChange={handleChecked} /> */}
      <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} updateItem={updateItem}/>
    </>
  );
};

export default ToDo;
