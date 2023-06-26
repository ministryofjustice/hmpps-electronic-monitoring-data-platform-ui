import { stubFor } from './wiremock'

const stubDeviceWearers = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/device-wearers/v1',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        deviceWearers: [
          {
            id: 1,
            deviceWearerId: '3fc55bb7-ba52-4854-be96-661f710328fc',
            firstName: 'John',
            lastName: 'Smith',
            type: 'Historical Case Centric',
          },
          {
            id: 2,
            deviceWearerId: 'ba34370c-9bf7-44eb-943e-2a6566205f99',
            firstName: 'Jane',
            lastName: 'Doe',
            type: 'Historical User Centric',
          },
        ],
      },
    },
  })
}

const stubDeviceWearersEmptyResponse = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/device-wearers/v1',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        deviceWearers: [],
      },
    },
  })
}

export default {
  stubDeviceWearers,
  stubDeviceWearersEmptyResponse,
}
