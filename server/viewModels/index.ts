type BaseErrorModel = {
  isError: true
  error: NonNullable<string>
}

type BaseSuccessModel = {
  isError: false
}

export { BaseErrorModel, BaseSuccessModel }
