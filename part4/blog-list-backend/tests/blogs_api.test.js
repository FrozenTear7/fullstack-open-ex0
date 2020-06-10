import { connection } from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import { initialBlogs, initialUser, blogsInDb } from './test_helper.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const newUser = new User(initialUser)

  initialBlogs.forEach(async (blog) => {
    const newBlog = new Blog(blog)
    newUser.blogs = newUser.blogs.concat(newBlog._id)
    await newBlog.save()
  })

  await newUser.save()
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('check id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    const newUser = await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const newBlog = {
      title: 'Test testing',
      author: 'Zulul Warrior',
      url: 'https://www.twitch.tv/forsen',
      likes: 5,
      userId: newUser._id,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const contents = blogsAtEnd.map((n) => n.title)
    expect(contents).toContain(newBlog.title)
  })

  test('no likes value defaults to 0', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    const newUser = await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const newBlog = {
      title: 'Test testing',
      author: 'Zulul Warrior',
      url: 'https://www.twitch.tv/forsen',
      userId: newUser._id,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  test('title and url missing return http 400', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    const newUser = await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const newBlog = {
      author: 'Zulul Warrior',
      likes: 5,
      userId: newUser._id,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('update works correctly', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    const newUser = await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const blog = {
      title: 'Test testing',
      author: 'Zulul Warrior',
      url: 'https://www.twitch.tv/forsen',
      likes: 5,
      userId: newUser._id,
    }

    const newBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)

    // newUser.blogs = newUser.blogs.concat(newBlog._id)
    // await newUser.save()

    console.log(newUser)
    console.log(newBlog)

    const testBlog = {
      ...newBlog,
      title: 'Updated title',
      author: 'Updated author',
      url: 'Updated url.com',
      likes: 123,
    }

    const response = await api
      .put(`/api/blogs/${testBlog._id}`)
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(testBlog).toMatchObject({
      title: response.body.title,
      author: response.body.author,
      url: response.body.url,
      likes: response.body.likes,
    })
  })

  test('invalid id returns error', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const testBlog = {
      ...initialBlogs[0],
      title: 'Updated title',
      author: 'Updated author',
      url: 'Updated url.com',
      likes: 123,
    }

    await api
      .put('/api/blogs/someNonExistingId')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(400)
  })

  test('check if validators work correctly', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const testBlog = {
      ...initialBlogs[0],
      title: '',
      author: '',
      url: '',
      likes: 123,
    }

    await api
      .put(`/api/blogs/${testBlog._id}`)
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('correct blog is deleted', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    const testBlog = initialBlogs[0]

    await api
      .delete(`/api/blogs/${testBlog._id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  })

  test('invalid id returns error', async () => {
    const user = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    await api.post('/api/users').send(user)

    const userTokenResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
    const { token } = userTokenResponse.body

    await api
      .delete('/api/blogs/someNonExistingId')
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

afterAll(async (done) => {
  connection.close()
  done()
})
