import { adaptRoute } from '@/main/adapters'
import { makeBrokerController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/broker', adaptRoute(makeBrokerController()))
}
