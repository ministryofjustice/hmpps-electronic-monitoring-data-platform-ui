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
      const testId = '987654321'
      jest.spyOn(mockRestClient, 'get').mockImplementation(async input => {
        if (input.path === `/device-wearers/v1/id/${testId}`) {
          return { error: '', deviceWearers: [dummyData[1]] }
        }
        throw new Error('Wrong call to API')
      })
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const result = await deviceWearerService.findOne(accessToken, testId)

      expect(result.deviceWearers[0].deviceWearerId).toEqual(testId)
      expect(result.deviceWearers[0]).toEqual(dummyData[1])
    })

    it('returns "No user found" error when deviceWearerId does not exist', async () => {
      const testId = 'this is a totally fake ID'
      const expectedError = 'No user found'
      jest.spyOn(mockRestClient, 'get').mockImplementation(async input => {
        if (input.path === `/device-wearers/v1/id/${testId}`) {
          return { error: expectedError, deviceWearers: [] }
        }
        throw new Error('Wrong call to API')
      })
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const result = await deviceWearerService.findOne(accessToken, testId /* req.query.searchTerm */)

      expect(result.error).toEqual(expectedError)
    })
  })

  describe('findMany', () => {
    it('retrieves all device wearers when no search term is provided', async () => {
      const searchTerm = ''
      jest.spyOn(mockRestClient, 'get').mockImplementation(async input => {
        if (input.path === `/device-wearers/v1`) {
          return { error: '', deviceWearers: dummyData }
        }
        throw new Error('Wrong call to API')
      })
      deviceWearerService = new DeviceWearerService(mockRestClient)

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

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
