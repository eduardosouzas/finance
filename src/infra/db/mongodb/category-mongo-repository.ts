import { MongoHelper } from '@/infra/db'
import { AddCategoryRepository, LoadCategoryRepository, AllCategoryRepository } from '@/data/protocols/db'

export class CategoryMongoRepository implements AddCategoryRepository {
  async add (data: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    const result = await MongoHelper.insertOne('categories', data)
    return result !== null
  }

  async load (id: string): Promise<LoadCategoryRepository.Result> {
    const categoryCollection = MongoHelper.getCollection('categories')
    const category = await categoryCollection.findOne({
      id
    }, {
      projection: {
        id: 1,
        name: 1,
        description: 1
      }
    })
    return category && MongoHelper.map(category)
  }

  async all (): Promise<AllCategoryRepository.Result[]> {
    const categoryCollection = MongoHelper.getCollection('categories')
    const categories = await categoryCollection.find().toArray()
    return categories && MongoHelper.map(categories)
  }
}
