import DeviceWearerService from './deviceWearerService'
import RestClient from '../data/restClient'
import config from '../config'
// import {ApiConfig} from "../config";

jest.mock('../data/restClient')

const dummyData = [
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

let deviceWearerService: DeviceWearerService
const accessToken = ''

describe('Device wearer service', () => {
  const mockRestClient = new RestClient(
    'Mock Device Wearer Client',
    config.apis.deviceWearer,
    null,
  ) as jest.Mocked<RestClient>

  describe('findOne', () => {
    it('retrieves one device wearer when deviceWearerId exists', async () => {
      const apiResponse = {
        error: '',
        deviceWearers: [dummyData[1]],
      }
      mockRestClient.get.mockResolvedValue(apiResponse)
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const testId = '987654321'
      const result = await deviceWearerService.findOne(accessToken, testId /* req.query.searchTerm */)

      expect(result.deviceWearers[0].deviceWearerId).toEqual(testId)
      expect(result.deviceWearers[0]).toEqual(dummyData[1])
    })

    it('returns "No user found" error when deviceWearerId does not exist', async () => {
      const apiResponse = {
        error: 'No user found',
      }
      const expectedError = 'No user found'
      mockRestClient.get.mockResolvedValue(apiResponse)
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const testId = 'this is a totally fake ID'
      const result = await deviceWearerService.findOne(accessToken, testId /* req.query.searchTerm */)

      expect(result.error).toEqual(expectedError)
    })
  })

  describe('findMany', () => {
    it('retrieves all device wearers when no search term is provided', async () => {
      const apiResponse = {
        error: '',
        deviceWearers: dummyData,
      }
      mockRestClient.get.mockResolvedValue(apiResponse)
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const searchTerm = ''

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result.error).toEqual('')
      expect(result.deviceWearers).toEqual(dummyData)
      expect(result.deviceWearers.length).toEqual(2)
    })
    it('retrieves only one device wearer when one matches search term', async () => {
      const apiResponse = {
        error: '',
        deviceWearers: dummyData[0],
      }
      mockRestClient.get.mockResolvedValue(apiResponse)
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const searchTerm = 'Curfew'

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result.error).toEqual('')
      expect(result.deviceWearers).toEqual(dummyData[0])
    })
    it('returns "No matching users found" error when there are no matching results', async () => {
      const expectedError = 'No matching users found'
      const apiResponse = {
        error: expectedError,
        deviceWearers: Array,
      }
      mockRestClient.get.mockResolvedValue(apiResponse)
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const searchTerm = 'Cheese is my favourite food'

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result.error).toEqual(expectedError)
    })
  })
})
