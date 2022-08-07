import { useState, useContext } from 'react';
import { DisplayContext } from '../../context/Display';
import { EditableText } from '@blueprintjs/core';

const List = ({ list, toggleComplete, deleteItem, updateItem }) => {

  const display = useContext(DisplayContext);
  const [page, setPage] = useState(0);

  const filteredList = display.completed ? list : list.filter(item => display.completed ? true : !item.complete);
  // const filteredList = list.filter(item => !item.complete);
  const start = display.itemsPerPage * page || 0;
  const end = start + display.itemsPerPage || filteredList.length;
  const pages = new Array(Math.ceil(filteredList.length / display.itemsPerPage)).fill('');

  const displayList = filteredList ? filteredList.slice(start, end) : [];

  return (
    <>
      {displayList.map(item => (
        <div key={item.id}>
          <hr />
          <br />
          <span><b>To Do Item</b>:</span>
          <EditableText onConfirm={(value) => updateItem(item.id, {text: value})} defaultValue={item.text} />
          {/* <p>{item.text}</p> */}

          <br />
          <span><b>Assigned To</b>:</span>
          <EditableText onConfirm={(value) => updateItem(item.id, { assignee: value})} defaultValue={item.assignee} />
          {/* <p><small>Assigned to: {item.assignee}</small></p> */}

          <br />
          <span><b>Difficulty</b>:</span>
          <EditableText onConfirm={(value) => updateItem(item.id, { difficulty: value})} defaultValue={item.difficulty} />
          {/* <p><small>Difficulty: {item.difficulty}</small></p> */}

          <br />
          <button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
      {
        pages.map((number, index) => (
          <button key={`page-${index}`} onClick={() => setPage(index)}>{index + 1}</button>
        ))
      }
    </>
  )
}

export default List;