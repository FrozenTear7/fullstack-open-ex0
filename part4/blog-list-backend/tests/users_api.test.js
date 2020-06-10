import { connection } from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import { initialUser, usersInDb } from './test_helper.js'
import User from '../models/user.js'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const newUser = new User(initialUser)

  await newUser.save()
})

describe('when there is initially one user in db', () => {
  test('valid users is created', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Superuser',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('invalid username length returns an error', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'R',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      `\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length`
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('invalid password length returns an error', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'P',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'provide a password at least 3 characters long'
    )

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('user signing in', () => {
  test('valid user is signed in and gets a token', async () => {
    const newUser = {
      username: 'testUser',
      name: 'Superuser',
      password: 'password',
    }

    await api.post('/api/users').send(newUser)

    const response = await api
      .post('/api/login')
      .send({ username: newUser.username, password: newUser.password })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeTruthy()
  })

  test('invalid user gets a login error', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Superuser',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })
})

afterAll(async (done) => {
  connection.close()
  done()
})
