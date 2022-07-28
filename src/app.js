import React from 'react';
import Form from './components/Form';

import ToDo from './components/ToDo/';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Form />
      <ToDo />
      </>
    );
  }
}
