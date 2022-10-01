import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController } from '@/main/factories'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/categories', auth, adaptRoute(makeAddCategoryController()))
  // router.get('/categories/:id', auth, adaptRoute(makeLoadBrokerController()))
  // router.get('/categories', auth, adaptRoute(makeAllBrokerController()))
}
