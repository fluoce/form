export type ResType<T = unknown> = {
  statusCode?: number
  success?: boolean
  message?: string | []
  data?: T & { message?: string }
}

export type RefreshResType = ResType<{
  refreshToken: string
  accessToken: string
}>
