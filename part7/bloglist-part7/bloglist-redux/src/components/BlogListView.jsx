import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import '../styles/BlogListView.css'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogListView = ({blogFormRef, addBlog}) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <Container className="custom-bg min-vh-100 py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="custom-text text-center  mb-4">Blogs</h1>
          <h2 className="custom-subheading">Create New</h2>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default BlogListView
