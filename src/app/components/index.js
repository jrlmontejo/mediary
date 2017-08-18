import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Dimmer,
  Loader
} from 'semantic-ui-react'

import PrivateRoute from './PrivateRoute/PrivateRoute'
import PublicRoute from './PublicRoute/PublicRoute'
import NotFound from './NotFound/NotFound'

import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'

class App extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return this.props.loading
    ? <Dimmer active inverted><Loader /></Dimmer>
    : (
      <Router>
        <Switch>
          <PublicRoute auth={false} exact path="/login" component={Login} />
          <PrivateRoute auth={true} exact path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/login" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.get('loading'),
    auth: state.authReducer.get('auth')
  }
}

export default connect(mapStateToProps)(App)
