export interface ErrorDetail {
  field?: string
  message: string
}

export interface ErrorMeta {
  timestamp: string
  path: string
  method: string
  requestId?: string
}

export interface ApiErrorResponse {
  success: false
  statusCode: number
  message: string
  errors: ErrorDetail[]
  meta: ErrorMeta
}

export interface AppErrorOptions {
  message: string
  statusCode?: number
  errors?: ErrorDetail[]
  cause?: unknown
}
