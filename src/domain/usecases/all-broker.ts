export interface AllBroker {
  all: () => Promise<AllBroker.Result[]>
}
export namespace AllBroker {
  export type Result = {
    id: string
    name: string
    description: string
  }
}
