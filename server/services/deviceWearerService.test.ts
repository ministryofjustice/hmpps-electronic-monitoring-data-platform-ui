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
    it('Retrieves one device wearer when deviceWearerId exists', async () => {
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

    it('Return "No user found" error when deviceWearerId does not exist', async () => {
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
    it('Retrieves all device wearers', async () => {
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
    })
  })
})
