import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'

let accountCollection: Collection
let app: Express

describe('Broker Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('brokers')
    await accountCollection.deleteMany({})
  })

  describe('POST /broker', () => {
    test('Should return 200 on create', async () => {
      await request(app)
        .post('/api/broker')
        .send({
          name: 'XP Investimentos',
          description: 'Corretora mais utilizada no brasil'
        })
        .expect(200)
    })
  })
})
