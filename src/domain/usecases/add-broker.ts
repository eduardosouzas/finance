export interface AddBroker {
  add: (broker: AddBroker.Params) => Promise<AddBroker.Result>
}
export namespace AddBroker {
  export type Params = {
    name: string
    description: string
  }
  export type Result = boolean
}
