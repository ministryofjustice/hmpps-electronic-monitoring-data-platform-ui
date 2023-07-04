import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'

import deviceWearerRoutes from './deviceWearerRouter'

export default function routes(services: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  // Home
  get('/', (req, res, next) => {
    res.render('pages/index')
  })
  router.use('/device-wearers', deviceWearerRoutes(services))

  return router
}
