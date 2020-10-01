export enum Verbs {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
  }

  export class HttpOptions {
    url: string
    body?: any
    options?: any
    header?: any
    cacheMins?: number
}
