// Implement the React context API for defining settings across the entire application.
// - Create a context for managing application display settings and provide this at the application level.
// - Display or Hide completed items (boolean).
// - Number of items to display per screen (number).
// - Default sort field (string).
// Manually set (hard code) those state settings in the context provider’s state, they should not be changeable.

import React, { useState } from 'react';

// 1. create a React Context object
export const DisplayContext = React.createContext();

// 2. create a provider component
function DisplayProvider({children}) {

  // 3. create state
  const [showCompleted, setShowCompleted] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [defaultSortField, setDefaultSortField] = useState('difficulty');

  return(
    <DisplayContext.Provider value={{showCompleted, itemsPerPage, defaultSortField}}>
      {children}
    </DisplayContext.Provider>
  )
}

export default DisplayProvider;