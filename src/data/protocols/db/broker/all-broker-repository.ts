export interface AllBrokerRepository {
  all: () => Promise<AllBrokerRepository.Result[]>
}

export namespace AllBrokerRepository {
  export type Result = {
    id: string
    name: string
    description: string
  }
}
