const isObject = (x: unknown): x is object => {
  return x !== null && (typeof x === 'object' || typeof x === 'function')
}

export default isObject