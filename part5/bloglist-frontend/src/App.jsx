import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const blogFormRef= useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch  (exception)  {
      setErrorMessage(exception)
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (id) => {
    try {
      const blogToUpdate = blogs.find(blog => blog.id === id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id === id ?{ ...returnedBlog, user: blogToUpdate.user }: blog))
    } catch (error) {
      setErrorMessage('Error updating likes')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try  {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog  =>  blog.id !==id))
      } catch (error)  {
        setErrorMessage('Error deleting blog')
        setIsError(true)
        setTimeout(() => {
          setErrorMessage(null)
          setIsError(false)
        }, 5000)
      }
    }

  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    blogService.setToken(null)
    setUser(null)
    setErrorMessage('logged out successfully')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  return (
    <div>
      <Notifications message={errorMessage} isError={isError}/>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={() => updateLikes(blog.id)}
                handleRemove={handleRemove}
              />
            )}
        </div>
      )}

    </div>
  )
}

export default App