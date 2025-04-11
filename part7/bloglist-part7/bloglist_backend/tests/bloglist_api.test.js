const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Create a user to associate with blogs
  const user = new User({
    username: 'testuser',
    passwordHash: await bcrypt.hash('password123', 10), // Hash the password
    name: 'Test User'
  })
  await user.save()

  const initialBlogs = helper.initialBlogs.map(blog => ({
    ...blog,
    user: user._id // Associate the blog with the user
  }))

  await Blog.insertMany(initialBlogs) // Insert initial blogs
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert.ok(blog.id, 'Blog should have an id property')
    assert.strictEqual(blog._id, undefined, 'Blog should not have an _id property')
  })
})

describe('Adding a blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Pinch of Yum',
      author: 'Lindsay Ostrom',
      url: 'https://pinchofyum.com/',
      likes: 3
    }

    const validToken = await helper.getValidToken('testuser') // Get the valid token for the user

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Pinch of Yum'))
  })

  test('adding a blog without a token fails with 401 Unauthorized', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Test Author',
      url: 'https://example.com/',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog) // No token is set
      .expect(401) // Expect unauthorized status
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5
    }

    const validToken = await helper.getValidToken('testuser') // Get the valid token for the user

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5
    }

    const validToken = await helper.getValidToken('testuser') // Get the valid token for the user

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('Deletion', () => {
  test('a blog can be deleted by its creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const validToken = await helper.getValidToken('testuser') // Get the valid token for the user

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('deleting a blog without a valid token returns 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401) // Expect unauthorized status

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
