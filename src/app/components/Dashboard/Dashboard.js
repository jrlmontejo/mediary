import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Grid
} from 'semantic-ui-react'
import './Dashboard.css'

import { logout } from '../../actions'

const Column = Grid.Column

class Dashboard extends Component {
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <Container className="Dashboard">
        <Grid padded stackable doubling columns={3}>
          <Column />
          <Column>
            Dashboard
            <div onClick={this.handleLogout}>Sign out</div>
          </Column>
          <Column />
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(Dashboard)