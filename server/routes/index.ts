import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'

import DeviceWearerController from './deviceWearerController'
import { AuthenticatedRequest } from '../authentication/auth'
// import logger from '../../logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes(service: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const deviceWearerController = new DeviceWearerController(service.deviceWearerService)

  // Home
  get('/', (req, res, next) => {
    res.render('pages/index')
  })

  // DeviceWearer routes
  get('/device-wearers', (req: AuthenticatedRequest, res) => deviceWearerController.listDeviceWearers(req, res))
  get('/device-wearers/id/:deviceWearerId', (req: AuthenticatedRequest, res) =>
    deviceWearerController.viewDeviceWearer(req, res),
  )

  return router
}
