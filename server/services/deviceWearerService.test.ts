import DeviceWearerService from './deviceWearerService'

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
  describe('findOne', () => {
    beforeEach(() => {
      deviceWearerService = new DeviceWearerService()
    })
    it('Retrieves one device wearer when deviceWearerId exists', async () => {
      const testId = '987654321'

      const result = await deviceWearerService.findOne(accessToken, testId /* req.query.searchTerm */)

      expect(result.deviceWearerId).toEqual(testId)
      expect(result).toEqual(dummyData[1])
    })
    it('Throws an exception when deviceWearerId does not exist', async () => {
      const testId = 'this is a totally fake ID'
      const expectedError = 'Unknown device wearer id: this is a totally fake ID'

      await expect(deviceWearerService.findOne(accessToken, testId)).rejects.toThrow(expectedError)
    })
  })

  describe('findMany', () => {
    it('Retrieves all users', async () => {
      const searchTerm = ''

      const result = await deviceWearerService.findMany(accessToken, searchTerm)

      expect(result).toEqual(dummyData)
    })
  })
})
