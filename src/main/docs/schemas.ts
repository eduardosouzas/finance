import {
  brokerSchema,
  brokersSchema,
  errorSchema,
  brokerParamsSchema,
  accountSchema,
  loginParamsSchema,
  signUpParamsSchema
} from './schemas/'

export default {
  broker: brokerSchema,
  brokers: brokersSchema,
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  brokerParams: brokerParamsSchema
}
