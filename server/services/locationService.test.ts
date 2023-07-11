import nock from 'nock'
import config from '../config'
import LocationService from './locationService'
import Location from '../data_models/location'

describe('location service', () => {
  let service: LocationService
  let fakeDataPlatformApi: nock.Scope
  const dummyData: Location[] = [
    {
      latitude: '20.0',
      longitude: '20.0',
      locationTime: '2023:12:12T12:34:00',
    },
    {
      latitude: '20.0',
      longitude: '20.0',
      locationTime: '2023:12:12T12:34:00',
    },
  ]

  beforeEach(() => {
    fakeDataPlatformApi = nock(config.apis.deviceWearer.url)
    service = new LocationService()
  })

  describe('findByDeviceId', () => {
    const deviceId = '123456789'
    const accessToken = ''
    const endpointUrl = `/location/v1/device-id/${deviceId}`
    it('should call API to get all locations for device Id', async () => {
      const expected = dummyData
      let called = 0

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        called += 1
        return { error: '', location: dummyData }
      })

      const result = await service.findByDeviceIdAndDateRange(accessToken, deviceId)

      expect(result).toEqual(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
      expect(called).toBe(1)
    })
    it('should throw for a 400 api response', async () => {
      expect.assertions(2)

      fakeDataPlatformApi.get(endpointUrl).reply(400, 'Bad Request')

      const expectedError = `Unable to find locations for ${deviceId}`
      const expected = new Error(expectedError)
      const result = service.findByDeviceIdAndDateRange('', deviceId)

      await expect(result).rejects.toMatchObject(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })
    it('should be okay for no devices to be returned', async () => {
      const expected: Location[] = []
      let called = 0
      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        called += 1
        return { error: '', location: [] }
      })
      const result = await service.findByDeviceIdAndDateRange(accessToken, deviceId)

      expect(result).toEqual(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
      expect(called).toBe(1)
    })
  })
})
