import React, { useState, useEffect } from 'react';

const storage = JSON.parse(localStorage.getItem('todo'));

// 1. create a React Context object
export const DisplayContext = React.createContext();

// 2. create a provider component
function DisplayProvider({children}) {

  // 3. create state
  const [completed, setCompleted] = useState(storage ? storage.completed : false);
  const [itemsPerPage, setItemsPerPage] = useState(storage ? storage.itemsPerPage : 2);
  const [sort, setSort] = useState(storage ? storage.sort : 'difficulty');
  const [save, setSave] = useState('false');

  const showCompleted = () => {
    setCompleted(!completed);
  }

  const changeItems = (number) => {
    setItemsPerPage(number);
  }

  const sortBy = (string) => {
    setSort(string);
  }

  const storeSettings = () => {
    setSave(!save);
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify({completed, itemsPerPage, sort}));
  }, [save])

  const values = {
    completed,
    itemsPerPage,
    sort,
    showCompleted,
    changeItems,
    sortBy,
    storeSettings,
  };

  return(
    <DisplayContext.Provider value={values}>
      {children}
    </DisplayContext.Provider>
  )
}

export default DisplayProvider;