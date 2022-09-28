import { DbAddCategory } from '@/data/usecases'
import { mockAddCategoryParams, throwError } from '@/tests/domain/mocks'
import { AddCategoryRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy
  }
}

describe('DbAddCategory Usecase', () => {
  test('Should call addCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const addCategoryParams = mockAddCategoryParams()
    await sut.add(addCategoryParams)
    expect(addCategoryRepositorySpy.params).toEqual({
      name: addCategoryParams.name,
      description: addCategoryParams.description
    })
  })

  test('Should throw if addCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddCategoryParams())
    expect(isValid).toBe(true)
  })

  test('Should return false if addCategoryRepository returns false', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    addCategoryRepositorySpy.result = false
    const isValid = await sut.add(mockAddCategoryParams())
    expect(isValid).toBe(false)
  })
})
