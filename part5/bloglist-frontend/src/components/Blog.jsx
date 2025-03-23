import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="blog-title">
        {blog.title} <span className="blog-author">{blog.author}</span>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">likes: {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          
          {user.username === blog.user.username && (
            <button onClick={() => handleRemove(blog.id)} className="remove-button">
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
