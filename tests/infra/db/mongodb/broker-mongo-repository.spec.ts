import { BrokerMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddBrokerParams } from '@/tests/domain/mocks'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker/locale/pt_BR'

const makeSut = (): BrokerMongoRepository => {
  return new BrokerMongoRepository()
}

let brokerCollection: Collection

describe('BrokerMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    brokerCollection = MongoHelper.getCollection('brokers')
    await brokerCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an broker on success', async () => {
      const sut = makeSut()
      const addBrokerParams = mockAddBrokerParams()
      const isValid = await sut.add(addBrokerParams)
      expect(isValid).toBe(true)
    })
  })

  describe('find()', () => {
    let name = faker.company.name()
    let description = faker.company.bsAdjective()

    beforeEach(() => {
      name = faker.company.name()
      description = faker.company.bsAdjective()
    })

    test('Should return an broker by id', async () => {
      const sut = makeSut()
      const id = await MongoHelper.insertOne('brokers', {
        name,
        description
      })
      const broker = await sut.load(id)
      expect(broker).toBeTruthy()
      expect(broker.id).toBeTruthy()
    })

    test('Should return null on broker by id with invalid id', async () => {
      const sut = makeSut()
      await MongoHelper.insertOne('brokers', {
        name,
        description
      })
      const broker = await sut.load(faker.datatype.uuid())
      expect(broker).toBeFalsy()
    })

    test('Should return all brokers', async () => {
      const sut = makeSut()
      for (let i = 0; i < 10; i++) {
        await MongoHelper.insertOne('brokers', {
          name: faker.company.name(),
          description: faker.company.bsAdjective
        })
      }
      const broker = await sut.all()
      expect(broker).toBeTruthy()
    })
  })
})
