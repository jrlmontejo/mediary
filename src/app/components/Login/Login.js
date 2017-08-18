import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Grid,
  Segment,
  Button,
  Form,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react'
import './Login.css'

import { login } from '../../actions'

const Column = Grid.Column
const FormInput = Form.Input

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleLoginSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    this.props.dispatch(login(email, password))
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
    const { loading, message } = this.props

    return (
      <Container className="Login">
        <Grid padded stackable doubling columns={3}>
          <Column />
          <Column>
            <Segment className="Login_form">
              <Dimmer inverted active={loading}>
                <Loader />
              </Dimmer>

              {
                message
                ? <Message negative>
                    <p>{message}</p>
                  </Message>
                : ''
              }

              <Form onSubmit={this.handleLoginSubmit}>
                <FormInput
                  autoFocus
                  label="Email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
                <Button type="submit" disabled={loading}>
                  Sign in
                </Button>
              </Form>
            </Segment>
          </Column>
          <Column />
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const login = state.authReducer.get('login')

  return {
    loading: login.get('loading'),
    message: login.get('message')
  }
}

export default connect(mapStateToProps)(Login)