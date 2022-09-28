export interface LoadBroker {
  load: (id: string) => Promise<LoadBroker.Result>
}

export namespace LoadBroker {
  export type Params = {
    id: string
  }
  export type Result = {
    id: string
  }
}
