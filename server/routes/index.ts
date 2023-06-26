import { type RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import type { Services } from '../services'
import type { ListDeviceWearersRequest } from './deviceWearerController'

import DeviceWearerController from './deviceWearerController'
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
  router.get('/device-wearers', (req, res) =>
    deviceWearerController.listDeviceWearers(req as ListDeviceWearersRequest, res),
  )
  router.get('/device-wearers/id/:id', (req, res, next) => {
    deviceWearerController.viewDeviceWearer(req, res, next)
  })
  router.get('/device-wearers/search', (req, res, next) => {
    deviceWearerController.searchDeviceWearer(req, res, next)
  })

  // Other routes
  router.get('/hello-dev-api', (req, res) =>
    res.redirect('https://api.electronic-monitoring-dev.hmpps.service.justice.gov.uk/hello/v1'),
  )
  router.get('/hello-local-api', (req, res) => res.redirect('http://localhost:8081/hello/v1'))

  return router
}
