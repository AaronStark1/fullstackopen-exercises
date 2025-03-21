const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('user creation fails if username is missing', async () => {
  const newUser = {
    password: 'password123',
    name: 'Test User'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.strictEqual(response.body.error, 'username and password are required')
})

test('user creation fails if password is missing', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.strictEqual(response.body.error, 'username and password are required')
})

test('user creation fails if username is less than 3 characters', async () => {
  const newUser = {
    username: 'us',
    password: 'password123',
    name: 'Test User'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.strictEqual(response.body.error, 'username and password must be at least 3 characters long')
})

test('user creation fails if password is less than 3 characters', async () => {
  const newUser = {
    username: 'testuser',
    password: 'pw',
    name: 'Test User'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.strictEqual(response.body.error, 'username and password must be at least 3 characters long')
})

test('user creation fails if username is not unique', async () => {
  const newUser = {
    username: 'testuser',
    password: 'password123',
    name: 'Test User'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert.strictEqual(response.body.error, 'expected `username` to be unique')
})

after(async () => {
  await mongoose.connection.close()
})
