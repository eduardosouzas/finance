export interface LoadBroker {
  load: (role?: string) => Promise<LoadBroker.Result>
}

export namespace LoadBroker {
  export type Result = {
    id: string
  }
}
