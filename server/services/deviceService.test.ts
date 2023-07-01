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

      fakeDataPlatformApi.get('/devices/').reply(400, 'Bad Request')

      await expect(deviceService.findByDeviceWearer('', deviceWearerId)).rejects.toMatchObject({
        message: `Unable to find devices for ${deviceWearerId}, Bad API Response: Bad Request`,
      })

      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('should retry twice for a 500 api response', async () => {
      expect.assertions(2)
      const deviceWearerId = '123456789'

      fakeDataPlatformApi.get('/devices/').times(3).reply(500)

      await expect(deviceService.findByDeviceWearer('', deviceWearerId)).rejects.toMatchObject({
        message: `Unable to find devices for ${deviceWearerId}, Bad API Response: Internal Server Error`,
      })

      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('should be okay for no devices to be returned', async () => {
      fakeDataPlatformApi.get('/devices/').reply(200, { devices: [] })

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
      fakeDataPlatformApi.get('/devices/').reply(200, {
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
      fakeDataPlatformApi.get('/devices/').reply(200, {
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

// should handle bad input
// Should handle malformed response from API
// Should ensure return devices are for the deviceWearerId
// Should do something for data that does not match the expected constraints
