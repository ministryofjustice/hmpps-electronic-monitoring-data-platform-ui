type DeviceType =
  | 'Location - fitted'
  | 'RF'
  | 'Location - non-fitted'
  | 'Alcohol (Transdermal)'
  | 'Alcohol (Remote Breath)'

type DeviceStatus = 'Not fitted' | 'Fitted' | 'Removed'

type Device = {
  id: number
  deviceId: string
  modelId: string
  firmwareVersion: string
  deviceType: DeviceType
  status: DeviceStatus
  batteryLifeRemaining: number
  dateTagFitted: string
  dateTagRemoved: string
}

export default Device
