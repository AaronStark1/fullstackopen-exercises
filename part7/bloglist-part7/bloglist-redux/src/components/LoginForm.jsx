import PropTypes from 'prop-types'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import '../styles/LoginForm.css'
const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <Container className="centered-container">
      <Row>
        
        <Col>
          <Form onSubmit={handleLogin} className="login-form">
            
            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Enter username"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter password"
                className="form-control"
              />
            </Form.Group>
            <Button type="submit" className="mt-3 login-button">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
