const isNotNullish = (data: unknown): data is Record<string, unknown> => data != null

export default isNotNullish