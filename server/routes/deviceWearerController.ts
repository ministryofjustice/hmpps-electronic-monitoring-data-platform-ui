import type { NextFunction, Request, Response } from 'express'

import DeviceWearerService from '../services/deviceWearerService'

export default class DeviceWearerController {
  constructor(private readonly deviceWearerService: DeviceWearerService) {}

  async listDeviceWearers({ user }: Request, res: Response) {
    if (user) {
      const deviceWearers = await this.deviceWearerService.findMany('' /* user.token */, '' /* req.query.searchTerm */)
      res.render('pages/deviceWearer/list', { deviceWearers })
    } else {
      res.render('pages/authError/noUser')
    }
  }

  async viewDeviceWearer({ user, params }: Request, res: Response, next: NextFunction) {
    if (user) {
      try {
        const deviceWearer = await this.deviceWearerService.findOne('' /* user.token */, params.id)
        res.render('pages/deviceWearer/detail', { deviceWearer })
      } catch (err) {
        next(err)
      }
    } else {
      res.render('pages/authError/noUser')
    }
  }
}
