// Implement the React context API for defining settings across the entire application.
// - Create a context for managing application display settings and provide this at the application level.
// - Display or Hide completed items (boolean).
// - Number of items to display per screen (number).
// - Default sort field (string).
// Manually set (hard code) those state settings in the context provider’s state, they should not be changeable.

import React, { useState } from 'react';

// create our React Context object
export const DisplayContext = React.createContext();

class DisplayProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompleted: true,
      numberItemsPerPage: 4,
      defaultSortField: '',
    }
  }
  render() {
    return (
      <DisplayContext.Provider value={this.state}>
        {this.props.children}
      </DisplayContext.Provider>
    );
  }
}

export default DisplayProvider;