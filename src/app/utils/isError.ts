type Error = {
  success: boolean
  message: string
}

const isError = (data: unknown): data is Error => {
  return (data as Error).success !== undefined && (data as Error).message !== undefined
}

export default isError