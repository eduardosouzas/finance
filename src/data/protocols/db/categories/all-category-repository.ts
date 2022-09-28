export interface AllCategoryRepository {
  all: () => Promise<AllCategoryRepository.Result[]>
}

export namespace AllCategoryRepository {
  export type Result = {
    id: string
    name: string
    description: string
  }
}
