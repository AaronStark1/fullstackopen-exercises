import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Comments from './Comments'
import '../styles/BlogDetailView.css'
import { FaThumbsUp, FaLink, FaTrashAlt } from 'react-icons/fa'

const BlogDetailView = ({ user, handleLike, handleRemove }) => {
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const [likes, setLikes] = useState(blog?.likes || 0)

  useEffect(() => {
    if (blog) setLikes(blog.likes)
  }, [blog])

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleLikeWithAnimation = () => {
    setLikes(prev => prev + 1)
    handleLike(blog.id)
  }

  return (
    <div className="blog-detail-container">
      <h2 className="blog-detail-title">
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url} className="blog-detail-url" target="_blank" rel="noopener noreferrer">
        <FaLink style={{ marginRight: '8px' }} />
        {blog.url}
      </a>

      <div className="blog-detail-likes">
        <motion.span
          key={likes}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {likes} likes
        </motion.span>
        <button onClick={handleLikeWithAnimation} className="like-button">
          <FaThumbsUp style={{ marginRight: '6px' }} />
          Like
        </button>
      </div>

      <p className="blog-detail-author">added by {blog.user.name}</p>

      {user.username === blog.user.username && (
        <button onClick={() => handleRemove(blog.id)} className="remove-button">
          <FaTrashAlt /> remove
        </button>
      )}

      {/* Comments component already styled inside */}
      <Comments blogId={blog.id} comments={blog.comments} />
    </div>
  )
}

export default BlogDetailView
