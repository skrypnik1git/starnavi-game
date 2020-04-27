import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
import Result from './pages/Result';

const App = props => (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path='/' component={Home}/>
          <Route exact path='/result' component={Result}/>  
        </BrowserRouter>
      </Provider>
    )

export default App;
