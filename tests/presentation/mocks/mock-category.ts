import { AddCategory } from '@/domain/usecases'

// import { faker } from '@faker-js/faker/locale/pt_BR'

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result = true

  async add (params: AddCategory.Params): Promise<AddCategory.Result> {
    this.params = params
    return this.result
  }
}

// export class LoadBrokersSpy implements LoadBroker {
//   id: string
//   async load (id: string): Promise<LoadBroker.Result> {
//     this.id = id
//     return { id: faker.datatype.uuid() }
//   }
// }

// export class AllBrokersSpy implements AllBroker {
//   brokers: AllBroker.Result[] = []

//   async all (): Promise<AllBroker.Result[]> {
//     for (let i = 0; i < 10; i++) {
//       this.brokers.push({
//         id: faker.datatype.uuid(),
//         name: faker.company.name(),
//         description: faker.company.bsAdjective()
//       })
//     }
//     return this.brokers
//   }
// }
