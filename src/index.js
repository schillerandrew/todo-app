import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import DisplayProvider from './context/Display.js';

class Main extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <DisplayProvider>
          <App />
        </DisplayProvider>
      </React.StrictMode>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
