import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from './testutils/appSetup'

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({})
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /device/deviceWearerId/deviceId', () => {
  it('should render device page', () => {
    return request(app)
      .get('/device/3fc55bb7-ba52-4854-be96-661f710328fc/8225d883-0fd1-4456-aeba-f7701412d35e')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Location data for selected device')
      })
  })
})
