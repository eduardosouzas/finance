import { CategoryMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddCategoryParams } from '@/tests/domain/mocks'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker/locale/pt_BR'

const makeSut = (): CategoryMongoRepository => {
  return new CategoryMongoRepository()
}

let categoryCollection: Collection

describe('CategoryMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    categoryCollection = MongoHelper.getCollection('categories')
    await categoryCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an category on success', async () => {
      const sut = makeSut()
      const addCategoryParams = mockAddCategoryParams()
      const isValid = await sut.add(addCategoryParams)
      expect(isValid).toBe(true)
    })
  })

  describe('find()', () => {
    let name = faker.finance.transactionType()
    let description = faker.finance.accountName()

    beforeEach(() => {
      name = faker.finance.transactionType()
      description = faker.finance.accountName()
    })

    test('Should return an broker by id', async () => {
      const sut = makeSut()
      const id = await MongoHelper.insertOne('categories', {
        name,
        description
      })
      const category = await sut.load(id)
      expect(category).toBeTruthy()
      expect(category.id).toBeTruthy()
    })

    test('Should return null on category by id with invalid id', async () => {
      const sut = makeSut()
      await MongoHelper.insertOne('categories', {
        name,
        description
      })
      const category = await sut.load(faker.datatype.uuid())
      expect(category).toBeFalsy()
    })

    test('Should return all categories', async () => {
      const sut = makeSut()
      for (let i = 0; i < 10; i++) {
        await MongoHelper.insertOne('categories', {
          name: faker.finance.transactionType(),
          description: faker.finance.accountName()
        })
      }
      const categories = await sut.all()
      expect(categories).toBeTruthy()
    })
  })
})
