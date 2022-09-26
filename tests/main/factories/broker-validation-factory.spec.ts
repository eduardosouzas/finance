import { makeBrokerValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('BrokerValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeBrokerValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
