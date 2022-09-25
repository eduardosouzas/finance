export interface LoadBrokerRepository {
  load: (id: string) => Promise<LoadBrokerRepository.Result>
}

export namespace LoadBrokerRepository {
  export type Result = {
    id: string
    name: string
    description: string
  }
}
