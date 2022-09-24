import { AddBroker } from '@/domain/usecases'

import { faker } from '@faker-js/faker/locale/pt_BR'

export const mockAddBrokerParams = (): AddBroker.Params => ({
  name: faker.company.name(),
  description: faker.company.bsAdjective()
})
