export interface LoadCategoryRepository {
  load: (id: string) => Promise<LoadCategoryRepository.Result>
}

export namespace LoadCategoryRepository {
  export type Result = {
    id: string
    name: string
    description: string
  }
}
