import { AddCategory } from '@/domain/usecases'
import { AddCategoryRepository } from '@/data/protocols'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly addCategoryRepository: AddCategoryRepository
  ) { }

  async add (categoryData: AddCategory.Params): Promise<AddCategory.Result> {
    return await this.addCategoryRepository.add(categoryData)
  }
}
