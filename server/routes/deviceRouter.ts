import { RequestHandler, Router } from 'express'
import { Services } from '../services'
import asyncMiddleware from '../middleware/asyncMiddleware'
import DeviceController from './deviceController'
import { AuthenticatedRequest } from '../authentication/auth'

export default function deviceRoutes(services: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const deviceController = new DeviceController(services.locationService, services.deviceService)

  // Device routes
  get('/:deviceWearerId/:deviceId', (req: AuthenticatedRequest, res) => deviceController.listLocations(req, res))

  return router
}
