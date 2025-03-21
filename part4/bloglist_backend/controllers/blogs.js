const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }) // Populate user information
    response.json(blogs)
  } catch (error) {
    response.status(400).end()
  }
})


blogsRouter.post('/', middleware.userExtractor,async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  try {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id // Assign the creator's ID to the blog
    })

    const savedBlog = await blog.save()

    // Update the user's blogs array
    user.blogs.push(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

  blogsRouter.put('/:id', async (request, response, next) => {
    const { likes } = request.body
  
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
      )
      response.json(updatedBlog)
    } catch (error) {
      next(error)
    }
  })
  
  blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    const user = request.user // Access the user from the request object
  
    try {
      const blog = await Blog.findById(request.params.id)
  
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
      }
  
      if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'not authorized to delete this blog' })
      }
  
      await Blog.findByIdAndDelete(blog._id)
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  })
  module.exports = blogsRouter