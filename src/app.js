import React from 'react';
import Form from './components/Form';
import ToDo from './components/ToDo/';
import { Icon } from "@blueprintjs/core";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
        <Icon icon="home" />
          <Link default to="/">Home</Link>
          <h1></h1>
          <Icon icon="settings" />
          <Link to="settings">Settings</Link>
          <Routes>
            <Route path="/" element={<ToDo />} />
            <Route path="settings" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
