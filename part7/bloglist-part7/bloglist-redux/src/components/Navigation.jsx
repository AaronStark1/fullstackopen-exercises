import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../styles/Navigation.css'

const Navigation = ({ user, handleLogout }) => {
  return (
    <Navbar className="navbar-dark" expand="lg">
      <Navbar.Brand >
        BlogList
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        {user && (
          <Nav>
            <span className="navbar-user-text">{user.name} logged in</span>
            <Button variant="outline-light" onClick={handleLogout} className="logout-button">
              Logout
            </Button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
