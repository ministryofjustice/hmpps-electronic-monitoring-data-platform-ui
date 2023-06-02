import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'

import DeviceWearerController from './deviceWearerController'
import logger from '../../logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes(service: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const deviceWearerController = new DeviceWearerController(service.deviceWearerService)

  get('/', (req, res, next) => {
    res.render('pages/index')
  })

  router.get('/device-wearers', (req, res) => deviceWearerController.listDeviceWearers(req, res))
  router.get('/device-wearer/:id', (req, res, next) => deviceWearerController.viewDeviceWearer(req, res, next))

  return router
}
