import { AddCategory } from '@/domain/usecases'

import { faker } from '@faker-js/faker/locale/pt_BR'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.finance.transactionType(),
  description: faker.finance.transactionDescription()
})

// export const mockLoadBrokerParams = (): LoadBroker.Params => ({
//   id: faker.datatype.uuid()
// })
