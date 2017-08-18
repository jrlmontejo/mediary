import React, { Component } from 'react'
import {
  Container,
  Grid,
  Segment,
  Button
} from 'semantic-ui-react'
import './Dashboard.css'

const Column = Grid.Column

class Dashboard extends Component {
  render() {
    return (
      <Container className="Dashboard">
        <Grid padded stackable doubling columns={3}>
          <Column />
          <Column>
            Dashboard
          </Column>
          <Column />
        </Grid>
      </Container>
    )
  }
}

export default Dashboard