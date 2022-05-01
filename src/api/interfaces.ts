export interface Response<T> {
  headers: any
  status: number
  body: T
}