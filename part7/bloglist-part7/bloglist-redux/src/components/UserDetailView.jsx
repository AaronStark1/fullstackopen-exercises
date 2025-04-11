import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import '../styles/UserDetailView.css'

const UserDetailView = () => {
  const location = useLocation()
  const { user } = location.state || {}

  if (!user) {
    return <div className="user-not-found">User not found</div>
  }

  return (
    <Container className="user-detail-container">
      <Row>
        <Col>
          <h2 className="user-detail-name">{user.name}</h2>
          <h3 className="user-detail-subtitle">Added Blogs</h3>
          <Table bordered hover responsive className="user-detail-table">
            <thead>
              <tr>
                <th>Blog Title</th>
              </tr>
            </thead>
            <tbody>
              {user.blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default UserDetailView
