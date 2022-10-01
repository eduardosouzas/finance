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

describe('Categories Routes', () => {
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

  describe('POST /categories', () => {
    test('Should return 200 on create', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/categories')
        .set('x-access-token', accessToken)
        .send({
          name: 'Ações',
          description: 'Tipo de categoria ações do mercado brasileiro B3'
        })
        .expect(200)
    })
  })
  // describe('GET /categories/:id/', () => {
  //   test('Should return 403 on load broker result without accessToken', async () => {
  //     await request(app)
  //       .get('/api/categories/any_id')
  //       .expect(403)
  //   })

  //   test('Should return 200 on load broker result with accessToken', async () => {
  //     const accessToken = await mockAccessToken()
  //     const res = await MongoHelper.insertOne('categories', {
  //       name: 'Ações',
  //       description: 'Tipo de categoria ações do mercado brasileiro B3'
  //     })
  //     await request(app)
  //       .get(`/api/categories/${res}`)
  //       .set('x-access-token', accessToken)
  //       .expect(200)
  //   })
  // })

  // describe('GET /brokers', () => {
  //   describe('GET /brokers/', () => {
  //     test('Should return 403 on all broker result without accessToken', async () => {
  //       await request(app)
  //         .get('/api/brokers')
  //         .expect(403)
  //     })

  //     test('Should return 200 on all broker result with accessToken', async () => {
  //       const accessToken = await mockAccessToken()
  //       await MongoHelper.insertOne('brokers', {
  //         name: 'XP Investimentos',
  //         description: 'Maior corretora de valores do Brasil'
  //       })
  //       await request(app)
  //         .get('/api/brokers')
  //         .set('x-access-token', accessToken)
  //         .expect(200)
  //     })
  //   })
  // })
})
