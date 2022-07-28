import { useState, useContext } from 'react';
import { DisplayContext } from '../../context/Display';

const List = ({ list, toggleComplete }) => {

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
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
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