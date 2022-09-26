import {
  brokerSchema,
  errorSchema,
  brokerParamsSchema,
  accountSchema,
  loginParamsSchema,
  signUpParamsSchema
} from './schemas/'

export default {
  broker: brokerSchema,
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  brokerParams: brokerParamsSchema
}
