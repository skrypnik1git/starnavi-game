import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './reducers';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Home />
        </div>
      </Provider>
    )
  }
}

export default App;
