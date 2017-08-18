import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

import { setAuthStatus } from '../actions/'

import PrivateRoute from './PrivateRoute/PrivateRoute'
import PublicRoute from './PublicRoute/PublicRoute'
import NotFound from './NotFound/NotFound'

import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthStatus())
  }

  componentWillUnmount() {

  }

  render() {
    const { authed } = this.props

    return (
      <Router>
        <Switch>
          <PublicRoute auth={authed} exact path="/login" component={Login} />
          <PrivateRoute auth={authed} exact path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/login" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    authed: state.authReducer.get('authed')
  }
}

export default connect(mapStateToProps)(App)
