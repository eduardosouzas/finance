import { DbAddBroker } from '@/data/usecases'
import { mockAddBrokerParams, throwError } from '@/tests/domain/mocks'
import { AddBrokerRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddBroker
  addBrokerRepositorySpy: AddBrokerRepositorySpy
}

const makeSut = (): SutTypes => {
  const addBrokerRepositorySpy = new AddBrokerRepositorySpy()
  const sut = new DbAddBroker(addBrokerRepositorySpy)
  return {
    sut,
    addBrokerRepositorySpy
  }
}

describe('DbAddBroker Usecase', () => {
  test('Should call AddBrokerRepository with correct values', async () => {
    const { sut, addBrokerRepositorySpy } = makeSut()
    const addbrokerParams = mockAddBrokerParams()
    await sut.add(addbrokerParams)
    expect(addBrokerRepositorySpy.params).toEqual({
      name: addbrokerParams.name,
      description: addbrokerParams.description
    })
  })

  test('Should throw if AddBrokerRepository throws', async () => {
    const { sut, addBrokerRepositorySpy } = makeSut()
    jest.spyOn(addBrokerRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddBrokerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddBrokerParams())
    expect(isValid).toBe(true)
  })

  test('Should return false if AddBrokerRepository returns false', async () => {
    const { sut, addBrokerRepositorySpy } = makeSut()
    addBrokerRepositorySpy.result = false
    const isValid = await sut.add(mockAddBrokerParams())
    expect(isValid).toBe(false)
  })
})
