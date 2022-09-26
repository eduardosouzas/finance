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
  const result = await accountCollection.updateOne({
    id: res
  }, {
    $set: {
      accessToken
    }
  })
  console.log(result)
  return accessToken
}

describe('Brokers Routes', () => {
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
  })

  describe('POST /brokers', () => {
    test('Should return 200 on create', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/brokers')
        .set('x-access-token', accessToken)
        .send({
          name: 'XP Investimentos',
          description: 'Corretora mais utilizada no brasil'
        })
        .expect(200)
    })
  })
  describe('GET /brokers/:brokerId/', () => {
    test('Should return 403 on load broker result without accessToken', async () => {
      await request(app)
        .get('/api/brokers/any_id')
        .expect(403)
    })

    test('Should return 200 on load broker result with accessToken', async () => {
      const accessToken = await mockAccessToken()
      const res = await MongoHelper.insertOne('brokers', {
        name: 'XP Investimentos',
        description: 'Maior corretora de valores do Brasil'
      })
      await request(app)
        .get(`/api/brokers/${res}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
