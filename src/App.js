import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import './App.scss'

import history from './history'
import LoginPage from './pages/login';
import Error404 from './pages/error-404';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={Error404} />
        </Switch>
      </Router>
    )
  }
}

export default App
