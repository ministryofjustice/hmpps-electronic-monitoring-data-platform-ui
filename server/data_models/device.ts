type DeviceType =
    | 'Location - fitted'
    | 'RF'
    | 'Location - non-fitted'
    | 'Alcohol (Transdermal)'
    | 'Alcohol (Remote Breath)'

type DeviceStatus = 'Not fitted' | 'Fitted' | 'Removed'


type Device = {
  deviceId: string
  deviceType: DeviceType
  status: DeviceStatus
  dateTagFitted: string
  dateTagRemoved: string
}

type DeviceResponse = {
  error: string
  device: Device[]
}

export { Device, DeviceResponse }
