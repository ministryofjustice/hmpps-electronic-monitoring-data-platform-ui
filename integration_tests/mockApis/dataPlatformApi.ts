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

const catchAll = () => {
  return stubFor({
    priority: 1000,
    request: {
      method: 'GET',
      urlPattern: `.*`,
    },
    response: {
      status: 501,
      headers: {
        'Content-Type': 'application/json;',
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

const stubDeviceWearer = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/device-wearers/v1/id/.*',
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
        ],
      },
    },
  })
}
const stubDeviceWearerEmptyResponse = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/device-wearers/v1/id/3fc55bb7-ba52-4854-be96-661f710328fc',
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

const stubDevices = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/devices/v1/device-wearer-id/3fc55bb7-ba52-4854-be96-661f710328fc',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        devices: [
          {
            id: 1,
            deviceId: 'd064e527-284d-4fc0-bda7-6295f1f7c8f4',
            modelId: '4fbda134-1bee-11ee-be56-0242ac120002',
            firmwareVersion: '1.0',
            deviceType: 'GPS',
            status: 'OK',
            batteryLifeRemaining: 80,
            dateTagFitted: '2000-10-30T01:32:00.000-00:00',
            dateTagRemoved: '2000-10-30T01:32:00.000-00:00',
          },
          {
            id: 2,
            deviceId: 'd064e527-284d-4fc0-bda7-6295f1f7d123',
            modelId: '4fbda134-1bee-11ee-be56-0242ac120123',
            firmwareVersion: '2.0',
            deviceType: 'GPS',
            status: 'OK',
            batteryLifeRemaining: 10,
            dateTagFitted: '2005-10-30T01:32:00.000-00:00',
            dateTagRemoved: '2020-10-30T01:32:00.000-00:00',
          },
        ],
      },
    },
  })
}

const stubDevicesEmptyResponse = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/devices/v1/device-wearer-id/.*',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        devices: [],
      },
    },
  })
}

const stubDevice = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/devices/v1/device-id/d064e527-284d-4fc0-bda7-6295f1f7c8f4',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        devices: [
          {
            id: 1,
            deviceId: 'd064e527-284d-4fc0-bda7-6295f1f7c8f4',
            modelId: '4fbda134-1bee-11ee-be56-0242ac120002',
            firmwareVersion: '1.0',
            deviceType: 'GPS',
            status: 'OK',
            batteryLifeRemaining: 80,
            dateTagFitted: '2000-10-30T01:32:00.000-00:00',
            dateTagRemoved: '2000-10-30T01:32:00.000-00:00',
          },
        ],
      },
    },
  })
}

const stubDeviceEmptyResponse = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/devices/v1/device-id/d064e527-284d-4fc0-bda7-6295f1f7c8f4',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        devices: [],
      },
    },
  })
}

const stubLocations = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/locations/v1/device-id/d064e527-284d-4fc0-bda7-6295f1f7c8f4',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        locations: [
          {
            id: 1,
            latitude: 20.0,
            longitude: 21.0,
            locationTime: '2000-10-31T01:30:00.000-00:00',
          },
          {
            id: 2,
            latitude: 22.0,
            longitude: 23.0,
            locationTime: '2001-10-31T01:30:00.000-00:00',
          },
          {
            id: 3,
            latitude: 24.0,
            longitude: 24.0,
            locationTime: '2002-10-31T01:30:00.000-00:00',
          },
          {
            id: 4,
            latitude: 25.0,
            longitude: 25.0,
            locationTime: '2003-10-31T01:30:00.000-00:00',
          },
        ],
      },
    },
  })
}

const stubLocationsWithDateStartDate = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: `/locations/v1/search-by-time-and-device.*`,
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        locations: [
          {
            id: 2,
            latitude: 22.0,
            longitude: 23.0,
            locationTime: '2001-10-31T01:30:00.000-00:00',
          },
          {
            id: 3,
            latitude: 24.0,
            longitude: 24.0,
            locationTime: '2002-10-31T01:30:00.000-00:00',
          },
          {
            id: 4,
            latitude: 25.0,
            longitude: 25.0,
            locationTime: '2003-10-31T01:30:00.000-00:00',
          },
        ],
      },
    },
  })
}

const stubLocationsEmptyResponse = () => {
  return stubFor({
    request: {
      method: 'GET',
      urlPattern: '/locations/v1/device-id/d064e527-284d-4fc0-bda7-6295f1f7c8f4',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;',
      },
      jsonBody: {
        error: '',
        locations: [],
      },
    },
  })
}

export default {
  stubDeviceWearers,
  stubDeviceWearersEmptyResponse,
  stubDeviceWearer,
  stubDeviceWearerEmptyResponse,
  stubDevices,
  stubDevicesEmptyResponse,
  stubDevice,
  stubDeviceEmptyResponse,
  stubLocations,
  stubLocationsWithDateStartDate,
  stubLocationsEmptyResponse,
  catchAll,
}
