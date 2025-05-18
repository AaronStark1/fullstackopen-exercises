import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification, setNotification } from './reducers/notificationSlice'
import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogSlice'
import { clearUser, setUser } from './reducers/userSlice'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import UsersView from './components/UsersView'
import UserDetailView from './components/UserDetailView'
import BlogDetailView from './components/BlogDetailView'
import Navigation from './components/Navigation'
import BlogListView from './components/BlogListView'
import SignupForm from './components/SignupForm'
import signupService from './services/signup'
import AuthSlider from './components/AuthSlider'
import Footer from './components/Footer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const [showSignup, setShowSignup] = useState(false)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const showNotification = (message, isError) => {
    const notificationMessage =
      typeof message === 'object' ? message.toString() : message
    dispatch(setNotification({ message: notificationMessage, isError }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', true)
    }
  }

    const handleSignup = async (event) => {
    event.preventDefault()

    try {
      await signupService.signup({
        username,
        name,
        password,
      })
      showNotification('Signup successful! Please log in.', false)
      setUsername('')
      setName('')
      setPassword('')
    } catch (exception) {
      showNotification('Signup failed. Please try again.', true)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      showNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        false
      )
    } catch (exception) {
      showNotification(exception.toString(), true)
    }
  }

  const updateLikes = async (id) => {
    try {
      dispatch(likeBlog(id))
    } catch (error) {
      showNotification('Error updating likes', true)
    }
  }

  const handleRemove = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)

    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        dispatch(deleteBlog(id))
        navigate('/')
        showNotification(`Blog ${blogToDelete.title} removed successfully`, false)
      } catch (error) {
        showNotification('Error deleting blog', true)
      }
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    blogService.setToken(null)
    dispatch(clearUser())
    showNotification('logged out successfully', false)
  }
  const toggleForm = () => {
    setShowSignup(!showSignup)
  }
  
  return (
    <div className='app-container'>
      
      <Notifications message={notification.message} isError={notification.isError} />
{user === null ? (
        <div>
          <AuthSlider 
               username={username}
               name={name}
               password={password}
               setUsername={setUsername}
               setName={setName}
               setPassword={setPassword}
               handleSignup={handleSignup} 
               handleLogin={handleLogin}
          />
        </div>
      ) : (
        <>
        <Navigation user={user} handleLogout={handleLogout} />
        <div className="main-content">
        <Routes>
          <Route path="/" element={<BlogListView blogFormRef={blogFormRef} addBlog={addBlog}/>} />
          <Route path="/blogs/:id" element={<BlogDetailView user={user} handleLike={updateLikes} handleRemove={handleRemove} />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserDetailView />} />
        </Routes>
        </div>
        <Footer/>
        </>
      )}
    </div>
  )
}

export default App
