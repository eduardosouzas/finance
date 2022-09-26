import { adaptRoute } from '@/main/adapters'
import { makeBrokerController, makeLoadBrokerController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/brokers', auth, adaptRoute(makeBrokerController()))
  router.get('/brokers/:id', auth, adaptRoute(makeLoadBrokerController()))
}
