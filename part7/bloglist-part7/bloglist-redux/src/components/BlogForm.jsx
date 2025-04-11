import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../styles/BlogForm.css'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={addBlog} className="blog-form-container mb-4">
      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label className="blog-form-label">Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter blog title"
          className="blog-form-input"
        />
      </Form.Group>

      <Form.Group controlId="formAuthor" className="mb-3">
        <Form.Label className="blog-form-label">Author</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Enter author name"
          className="blog-form-input"
        />
      </Form.Group>

      <Form.Group controlId="formUrl" className="mb-3">
        <Form.Label className="blog-form-label">URL</Form.Label>
        <Form.Control
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Enter blog URL"
          className="blog-form-input"
        />
      </Form.Group>

      <Button type="submit" className="submit-blog-button w-100">
        Create Blog
      </Button>
    </Form>
  )
}

export default BlogForm
