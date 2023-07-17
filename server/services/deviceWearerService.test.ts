import nock from 'nock'
import config from '../config'
import DeviceWearerService from './deviceWearerService'
import DeviceWearer from '../data_models/deviceWearer'

// BE CAREFUL THIS IS MOCKING THE CORRECT THING. NOT: jest.mock('../data/restClient')
jest.mock('../data/hmppsAuthClient')

describe('Device wearer service', () => {
  let deviceWearerService: DeviceWearerService
  let fakeDataPlatformApi: nock.Scope
  const accessToken = ''
  const dummyData: DeviceWearer[] = [
    {
      deviceWearerId: '123456789',
      firstName: 'J',
      lastName: 'Smith',
      type: 'Curfew',
    },
    {
      deviceWearerId: '987654321',
      firstName: 'J',
      lastName: 'Doe',
      type: 'Inclusion Zone',
    },
  ]

  beforeEach(() => {
    fakeDataPlatformApi = nock(config.apis.deviceWearer.url)
    deviceWearerService = new DeviceWearerService()
  })

  describe('findOne', () => {
    it('retrieves one device wearer when deviceWearerId exists', async () => {
      const testId = '987654321'
      const endpointUrl = `/device-wearers/v1/id/${testId}`
      const expected: DeviceWearer = dummyData[1]

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        return { error: '', deviceWearers: [dummyData[1]] }
      })

      const result = await deviceWearerService.findOne(accessToken, testId)

      expect(result.deviceWearerId).toEqual(testId)
      expect(result).toEqual(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('returns "No user found" error when deviceWearerId does not exist', async () => {
      const testId = 'This-is-a-totally-fake-Id'
      const endpointUrl = `/device-wearers/v1/id/${testId}`
      const expectedError = `No device wearer found with ID ${testId}`
      const expected = new Error(expectedError)

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        return { error: '', deviceWearers: [], message: 'No data found' }
      })

      const result = deviceWearerService.findOne(accessToken, testId)

      await expect(result).rejects.toMatchObject(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('returns "Duplicate users found" error if multiple results returned from API', async () => {
      const testId = 'This-is-a-duplicate-Id'
      const endpointUrl = `/device-wearers/v1/id/${testId}`
      const expectedError = `Duplicate device wearer found with ID ${testId}`
      const expected = new Error(expectedError)

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        return { error: '', deviceWearers: dummyData, message: '' }
      })

      const result = deviceWearerService.findOne(accessToken, testId)

      await expect(result).rejects.toMatchObject(expected)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })
  })

  describe('findMany', () => {
    it('retrieves all device wearers when no search term is provided', async () => {
      const searchTerm = ''
      const endpointUrl = '/device-wearers/v1'
      const expected: Array<DeviceWearer> = dummyData

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        return { error: '', deviceWearers: dummyData }
      })

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result).toEqual(expected)
      expect(result.length).toEqual(expected.length)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('retrieves only one device wearer when one matches search term', async () => {
      const searchTerm = 'Curfew'
      const endpointUrl = `/device-wearers/v2/search/${searchTerm}`
      const expected: Array<DeviceWearer> = [dummyData[0]]

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        return { error: '', deviceWearers: [dummyData[0]] }
      })

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result).toEqual(expected)
      expect(result.length).toEqual(expected.length)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })

    it('retrieves an empty list when there are no matching results', async () => {
      const searchTerm = 'obviously not real'
      const endpointUrl = `/device-wearers/v2/search/${encodeURIComponent(searchTerm)}`
      const expected: Array<DeviceWearer> = []

      fakeDataPlatformApi.get(endpointUrl).reply(200, () => {
        return { error: '', deviceWearers: [] }
      })

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result).toEqual(expected)
      expect(result.length).toEqual(expected.length)
      expect(fakeDataPlatformApi.isDone()).toBeTruthy()
    })
  })
})
