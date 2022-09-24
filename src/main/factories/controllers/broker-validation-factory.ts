import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
// import { EmailValidatorAdapter } from '@/infra/validators'

export const makeBrokerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }
  // validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  // validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
