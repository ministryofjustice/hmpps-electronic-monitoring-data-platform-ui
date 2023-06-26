type BaseErrorModel = {
  error: NonNullable<string>
}

type BaseSuccessModel = {
  error: null
}

export { BaseErrorModel, BaseSuccessModel }
