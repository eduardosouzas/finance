import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'
import { sign } from 'jsonwebtoken'

let accountCollection: Collection
let app: Express
const mockAccessToken = async (): Promise<string> => {
  const res = await MongoHelper.insertOne('accounts', {
    name: 'Eduardo',
    email: 'eduardomail@gmail.com',
    password: '123'
  })
  const id = res
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    id: res
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Brokers GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    const brokersCollection = MongoHelper.getCollection('brokers')
    await brokersCollection.deleteMany({})
  })

  describe('BrokerById Query', () => {
    let id = ''
    let query = `query {
      brokerById(id: "id_subs") {
        id,
        name,
        description
      }
    }`

    test('Should return an brokers by Id on valid credentials', async () => {
      const accessToken = await mockAccessToken()
      id = await MongoHelper.insertOne('brokers', {
        name: 'XP Investimento',
        description: 'Investimento'
      })
      query = query.replace('id_subs', id)
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.brokerById.description).toBe('Investimento')
      expect(res.body.data.brokerById.name).toBe('XP Investimento')
    })

    test('Should return Access denied on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })

  describe('Brokers all query', () => {
    const query = `query {
      brokers {
        id
        name
        description
      }
    }`

    test('Should return an all brokers data', async () => {
      const accessToken = await mockAccessToken()
      await MongoHelper.insertOne('brokers', {
        name: 'XP Investimentos',
        description: 'Maior corretora de valores do Brasil'
      })
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.brokers[0]).toBeTruthy()
      expect(res.body.data.brokers[0].name).toBe('XP Investimentos')
    })

    test('Should return Access denied on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })
})
