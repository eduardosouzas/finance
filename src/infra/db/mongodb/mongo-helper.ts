import { MongoClient, Collection } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async insertOne (name: string, data: object): Promise<string> {
    const id = uuidv4()
    const result = await this.client.db().collection(name).insertOne({ id, ...data })
    return !result.insertedId ? null : id
  },

  map: (data: any): any => {
    return data
    // const { _id, ...rest } = data
    // return { ...rest, id: _id.toHexString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
