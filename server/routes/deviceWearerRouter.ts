import { RequestHandler, Router } from 'express'
import { Services } from '../services'
import asyncMiddleware from '../middleware/asyncMiddleware'
import DeviceWearerController from './deviceWearerController'
import { AuthenticatedRequest } from '../authentication/auth'

export default function deviceWearerRoutes(services: Services): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  const deviceWearerController = new DeviceWearerController(services.deviceWearerService, services.deviceService)

  // DeviceWearer routes
  get('', (req: AuthenticatedRequest, res) => deviceWearerController.listDeviceWearers(req, res))
  get('id/:deviceWearerId', (req: AuthenticatedRequest, res) => deviceWearerController.viewDeviceWearer(req, res))

  return router
}
