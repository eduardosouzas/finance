import { AddCategoryRepository, LoadCategoryRepository, AllCategoryRepository } from '@/data/protocols'

import { faker } from '@faker-js/faker/locale/pt_BR'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result = true

  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadCategoryRepositorySpy implements LoadCategoryRepository {
  result = {
    id: faker.datatype.uuid(),
    name: faker.finance.transactionType(),
    description: faker.finance.transactionDescription()
  }

  async load (id: string): Promise<LoadCategoryRepository.Result> {
    return this.result
  }
}

export class AllCategoryRepositorySpy implements AllCategoryRepository {
  categories: AllCategoryRepository.Result[] = []

  async all (): Promise<AllCategoryRepository.Result[]> {
    for (let i = 0; i < 10; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.finance.transactionType(),
        description: faker.finance.transactionDescription()
      })
    }
    return this.categories
  }
}
