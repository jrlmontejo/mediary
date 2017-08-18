import React, { Component } from 'react'
import {
  Container,
  Grid,
  Segment,
  Button,
  Form
} from 'semantic-ui-react'
import './Login.css'

const Column = Grid.Column
const FormInput = Form.Input

class Login extends Component {
  render() {
    return (
      <Container className="Login">
        <Grid padded stackable doubling columns={3}>
          <Column />
          <Column>
            <Segment className="Login_form">
              <Form>
                <FormInput autoFocus label="Email" type="email" placeholder="Email" />
                <FormInput label="Password" type="password" placeholder="Password" />
                <Button type="submit">Sign in</Button>
              </Form>
            </Segment>
          </Column>
          <Column />
        </Grid>
      </Container>
    )
  }
}

export default Login