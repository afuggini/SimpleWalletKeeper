import { createMocks } from 'node-mocks-http'
import { makeLoginHandler } from './login'

const getUser = jest.fn(
  (username: string) => Promise.resolve({
    username: 'testuser',
    password: '123456'
  })
)

const getNoUser = jest.fn(
  (username: string) => Promise.resolve(undefined)
)

describe('login', () => {
  it('should return 401 if username missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { password: '123456' }
    })
    const handler = makeLoginHandler(getUser)
    await handler(req, res)
    expect(res._getStatusCode()).toBe(401)
  })

  it('should return 401 if password missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'username' }
    })
    const handler = makeLoginHandler(getUser)
    await handler(req, res)
    expect(res._getStatusCode()).toBe(401)
  })

  it('should return 401 if both username and password missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {}
    })
    const handler = makeLoginHandler(getUser)
    await handler(req, res)
    expect(res._getStatusCode()).toBe(401)
  })

  it('should return 401 if wrong username or password', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'wronguser', password: '123456' },
      session: { save: jest.fn() }
    })
    const handler = makeLoginHandler(getNoUser)
    await handler(req, res)
    expect(res._getStatusCode()).toBe(401)
  })

  it('should return 200 if username and password match a user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'testuser', password: '123456' },
      session: { save: jest.fn() }
    })
    const handler = makeLoginHandler(getUser)
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  it('should return 404 if request type is not POST', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    const handler = makeLoginHandler(getUser)
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })
})
