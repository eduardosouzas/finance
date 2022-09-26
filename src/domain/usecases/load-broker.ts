export interface LoadBroker {
  load: (id: string) => Promise<LoadBroker.Result>
}

export namespace LoadBroker {
  export type Result = {
    id: string
  }
}
