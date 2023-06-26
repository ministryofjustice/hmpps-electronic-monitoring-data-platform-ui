import type { NextFunction, Request, Response } from 'express'
import logger from '../../logger'
import { DeviceWearerResponse } from '../data_models/deviceWearer'

import DeviceWearerService from '../services/deviceWearerService'

export type ListDeviceWearersRequest = Request & { user: Express.User }

export default class DeviceWearerController {
  constructor(private readonly deviceWearerService: DeviceWearerService) {}

  async listDeviceWearers({ user }: ListDeviceWearersRequest, res: Response) {
    try {
      const deviceWearerResponse: DeviceWearerResponse = await this.deviceWearerService.findMany(
        user.token,
        '' /* req.query.searchTerm */,
      )
      if (deviceWearerResponse.deviceWearers.length === 0) {
        res.render('pages/apiError', { errorMessage: deviceWearerResponse.error })
      } else {
        res.render('pages/deviceWearer/list', { deviceWearers: deviceWearerResponse.deviceWearers, isError: false })
      }
    } catch (e) {
      res.render('pages/apiError', { errorMessage: 'Something has gone wrong, sorry!' })
    }
  }

  async viewDeviceWearer({ user, params }: Request, res: Response, next: NextFunction) {
    if (user) {
      try {
        const deviceWearerResponse: DeviceWearerResponse = await this.deviceWearerService.findOne(user.token, params.id)
        // res.render('pages/deviceWearer/detail', { deviceWearer: deviceWearerResponse.deviceWearers[0], errorMessage: deviceWearerResponse.error })
        if (deviceWearerResponse.deviceWearers.length === 0) {
          res.render('pages/apiError', { errorMessage: deviceWearerResponse.error })
        } else {
          res.render('pages/deviceWearer/detail', {
            deviceWearer: deviceWearerResponse.deviceWearers[0],
            isError: false,
          })
        }
      } catch (err) {
        next(err)
      }
    } else {
      res.render('pages/authError/noUser')
    }
  }

  async searchDeviceWearer({ user, query }: Request, res: Response, next: NextFunction) {
    if (user) {
      try {
        if (query.search == null) {
          res.render('pages/deviceWearer/search')
        } else {
          logger.debug(
            `calling deviceWearerController.searchDeviceWearer, with searchParams ${query.search.toString()}`,
          )
          const searchParam = query.search.toString()
          const deviceWearerResponse: DeviceWearerResponse = await this.deviceWearerService.findMany(
            user.token,
            searchParam,
          )
          if (deviceWearerResponse.deviceWearers.length === 0) {
            res.render('pages/apiError', { errorMessage: deviceWearerResponse.error })
          } else {
            res.render('pages/deviceWearer/list', { deviceWearers: deviceWearerResponse.deviceWearers, isError: false })
          }
        }
      } catch (err) {
        next(err)
      }
    }
  }
}
