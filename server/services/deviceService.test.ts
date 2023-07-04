import nock from 'nock'
import config from '../config'
import DeviceService from './deviceService'

describe('DeviceService', () => {
  let deviceService: DeviceService
  let fakeDataPlatformApi: nock.Scope

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
  })
})
