import { useState } from 'react'
import axios from 'axios'
import '../styles/Comments.css'

const Comments = ({ blogId, comments }) => {
  const [newComment, setNewComment] = useState('')
  const [commentState, setCommentState ] = useState(comments)
  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }
  console.log(commentState);
  
  const addComment = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`/api/blogs/${blogId}/comments`, { comment: newComment })
      
      // Handle the response to update the comments list if needed
      setCommentState(commentState.concat(newComment))
      setNewComment('')
      
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div  className="comments-section">
      <h3>comments</h3>

      <form onSubmit={addComment}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
        />
        <button type="submit" className='comment-button'>add comment</button>
      </form>
      <ul>
        {commentState.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
