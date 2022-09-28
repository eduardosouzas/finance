export interface AddCategory {
  add: (broker: AddCategory.Params) => Promise<AddCategory.Result>
}
export namespace AddCategory {
  export type Params = {
    name: string
    description: string
  }
  export type Result = boolean
}
