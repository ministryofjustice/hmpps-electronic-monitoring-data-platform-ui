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

describe('GET /', () => {
  it('should render device wearers page', () => {
    return request(app)
      .get('/device-wearers/')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('This search will attempt to match your whole input to any part of any field')
      })
  })
})

describe('GET /id/deviceWearerId', () => {
  it('device wearer summary page', () => {
    return request(app)
      .get('/device-wearers/id/3fc55bb7-ba52-4854-be96-661f710328fc')
      .expect('Content-Type', /html/)
      .expect(res => {
        expect(res.text).toContain('Device wearer summary')
      })
  })
})
