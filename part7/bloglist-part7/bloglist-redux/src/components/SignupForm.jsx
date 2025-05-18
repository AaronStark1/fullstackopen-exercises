import PropTypes from 'prop-types'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const SignupForm = ({ username, name, password, setUsername, setName, setPassword, handleSignup }) => {
  return (
    <Container className="centered-container">
      <Row>
        <Col>
          <Form onSubmit={handleSignup} className="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Enter username"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={({ target }) => setName(target.value)}
                placeholder="Enter name"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter password"
                className="form-control"
              />
            </Form.Group>
            <Button type="submit" className="mt-3 login-button">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default SignupForm
