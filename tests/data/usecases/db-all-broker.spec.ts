import { DbAllBroker } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { AllBrokerRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAllBroker
  allBrokerRepositorySpy: AllBrokerRepositorySpy
}

const makeSut = (): SutTypes => {
  const allBrokerRepositorySpy = new AllBrokerRepositorySpy()
  const sut = new DbAllBroker(allBrokerRepositorySpy)
  return {
    sut,
    allBrokerRepositorySpy
  }
}

describe('DbAllBroker Usecase', () => {
  test('Should call AllBrokerRepository with correct values', async () => {
    const { sut, allBrokerRepositorySpy } = makeSut()
    const result = await sut.all()
    expect(result).toEqual(allBrokerRepositorySpy.brokers)
  })

  test('Should throw if AllBrokerRepository throws', async () => {
    const { sut, allBrokerRepositorySpy } = makeSut()
    jest.spyOn(allBrokerRepositorySpy, 'all').mockImplementationOnce(throwError)
    const promise = sut.all()
    await expect(promise).rejects.toThrow()
  })
})
