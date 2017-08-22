import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Grid
} from 'semantic-ui-react'
import './Dashboard.css'
import { db } from '../../../config/stitch'

import { logout } from '../../actions'

const Column = Grid.Column

class Dashboard extends Component {
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {
    db.createCollection('test').then(() => {
      console.log('Test')
    })

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