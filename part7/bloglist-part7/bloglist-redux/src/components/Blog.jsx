import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: '24px',
    borderRadius: '16px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 12px rgba(255, 111, 0, 0.15)',
    marginBottom: '24px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }
  

  return (
    <div style={blogStyle} className='blog-card'>
      <h2 className="custom-text">
        <Link to={`/blogs/${blog.id}`} className="custom-link">
          {blog.title}
        </Link>
      </h2>
      <p className="custom-text">by {blog.author}</p>
    </div>
  )
}

export default Blog
