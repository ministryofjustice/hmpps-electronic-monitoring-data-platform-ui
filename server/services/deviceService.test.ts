import nock from 'nock'
import config from '../config'
import DeviceService from './deviceService'
import DeviceWearerService from "./deviceWearerService";
import RestClient from "../data/restClient";

describe('DeviceService', () => {
  let deviceService: DeviceService
  let fakeDataPlatformApi: nock.Scope
  const accessToken = ''

  const mockRestClient = new RestClient(
    'Mock Device Wearer Client',
    config.apis.deviceWearer,
    null,
  ) as jest.Mocked<RestClient>

  const dummyData = [
    {
      deviceId: '8225d883-0fd1-4456-aeba-f7701412d35e',
      deviceType: 'RF',
      status: 'Not fitted',
      dateTagFitted: 'A',
      dateTagRemoved: 'Ok',
    },
    {
      deviceId: '8225d883-0fd1-4456-aeba-f7701412d35a',
      deviceType: 'RF',
      status: 'Not fitted',
      dateTagFitted: 'B',
      dateTagRemoved: 'Ok',
    },
  ]

  beforeEach(() => {
    fakeDataPlatformApi = nock(config.apis.deviceWearer.url)
    deviceService = new DeviceService()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('findByDeviceWearer', () => {
    it('should throw for a 400 api response', async () => {
      expect.assertions(2)

      const deviceWearerId = '123456789'
      fakeDataPlatformApi.get(`/devices/v1/device-wearer-id/${deviceWearerId}`).reply(400, 'Bad Request')

      const expectedError = `Unable to find devices for ${deviceWearerId}`
      const expected = new Error(expectedError)
      const result = deviceService.findByDeviceWearer('', deviceWearerId)

      await expect(result).rejects.toMatchObject(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('should retry twice for a 500 api response', async () => {
      expect.assertions(2)

      const deviceWearerId = '123456789'
      fakeDataPlatformApi.get(`/devices/v1/device-wearer-id/${deviceWearerId}`).times(3).reply(500)

      const expectedError = `Unable to find devices for ${deviceWearerId}`
      const expected = new Error(expectedError)
      const result = deviceService.findByDeviceWearer('', deviceWearerId)

      await expect(result).rejects.toMatchObject(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('should be okay for no devices to be returned', async () => {
      fakeDataPlatformApi.get('/devices/v1/device-wearer-id/').reply(200, { devices: [] })

      const result = await deviceService.findByDeviceWearer('', '')

      expect(result).toEqual([])
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('should be okay for one device to be returned', async () => {
      const devices = [
        {
          deviceId: '123456789',
          deviceType: 'Location - fitted',
          status: 'Removed',
          dateTagFitted: '01/01/1970 00:00:00',
          dateTagRemoved: '01/01/1970 00:00:00',
        },
      ]
      fakeDataPlatformApi.get('/devices/v1/device-wearer-id/').reply(200, {
        devices,
      })

      const result = await deviceService.findByDeviceWearer('', '')

      expect(result).toEqual(devices)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('should be okay for many devices to be returned', async () => {
      const devices = [
        {
          deviceId: '123456789',
          deviceType: 'Location - fitted',
          status: 'Removed',
          dateTagFitted: '01/01/1970 00:00:00',
          dateTagRemoved: '01/01/1970 00:00:00',
        },
        {
          deviceId: '123456789',
          deviceType: 'Location - fitted',
          status: 'Removed',
          dateTagFitted: '01/01/1970 00:00:00',
          dateTagRemoved: '01/01/1970 00:00:00',
        },
      ]
      fakeDataPlatformApi.get('/devices/v1/device-wearer-id/').reply(200, {
        devices,
      })

      const result = await deviceService.findByDeviceWearer('', '')

      expect(result).toEqual(devices)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    // Things to think about
    it.failing('could ensure the api response returned devices for the correct deviceWearerId', () => {
      expect(1).toEqual(2)
    })
    it.failing("could handle api responses that don't match the exprected data e.g. unknown device types", () => {
      expect(1).toEqual(2)
    })
    it.failing('could handle a bad input, but also the API could handle that', () => {
      expect(1).toEqual(2)
    })
    it.failing('could check that the api response has the correct shape', () => {
      expect(1).toEqual(2)
    })

    describe('findMany', () => {
      it('retrieves all devices when no search term is provided', async () => {
        const searchTerm = ''
        const deviceWearerId = ''
        jest.spyOn(mockRestClient, 'get').mockImplementation(async input => {
          if (input.path === `/device/v1/device-wearer-id/${deviceWearerId}/search/${searchTerm}`) {
            return { error: '', deviceWearers: dummyData }
          }
          throw new Error('Wrong call to API')
        })
        deviceService = new DeviceService(mockRestClient)

        const result = await DeviceService.findMany(accessToken, searchTerm)

        expect(result.error).toEqual('')
        expect(result.deviceWearers).toEqual(dummyData)
        expect(result.deviceWearers.length).toEqual(2)
      })
      it('retrieves only one device wearer when one matches search term', async () => {
        const searchTerm = 'Curfew'
        jest.spyOn(mockRestClient, 'get').mockImplementation(async input => {
          if (input.path === `/device-wearers/v2/search/${searchTerm}`) {
            return { error: '', deviceWearers: dummyData[0] }
          }
          throw new Error('Wrong call to API')
        })
        deviceWearerService = new DeviceWearerService(mockRestClient)

        const result = await deviceWearerService.findMany(accessToken, searchTerm)

        expect(result.error).toEqual('')
        expect(result.deviceWearers).toEqual(dummyData[0])
      })
      it('returns "No matching users found" error when there are no matching results', async () => {
        const searchTerm = 'Cheese is my favourite food'
        const expectedError = 'No matching users found'
        jest.spyOn(mockRestClient, 'get').mockImplementation(async input => {
          if (input.path === `/device-wearers/v2/search/${searchTerm}`) {
            return { error: expectedError, deviceWearers: [] }
          }
          throw new Error('Wrong call to API')
        })
        deviceWearerService = new DeviceWearerService(mockRestClient)

        const result = await deviceWearerService.findMany(accessToken, searchTerm)

        expect(result.error).toEqual(expectedError)
      })
    })
  })
})
