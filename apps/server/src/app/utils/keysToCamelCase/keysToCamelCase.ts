/**
 *
 * @param text
 * @param index
 * @param delimiter
 * @param recased
 * @returns
 */
const toCamelCase = (
  text: string,
  index: number,
  delimiter: string,
  recased: boolean = false
): [string, boolean] => {
  if (text.length - 1 === index) return [text, false]

  const delimiterIndex = text.indexOf(delimiter)
  if (delimiterIndex === -1) return [text, recased]

  return toCamelCase(
    text.replace(
      delimiter + text.charAt(delimiterIndex + 1),
      text.charAt(delimiterIndex + 1).toUpperCase()
    ),
    delimiterIndex + 1,
    delimiter,
    true
  )
}

// crazy ass typescript types but it does wonders to intellisense
// and actually caught problems
type SnakeToCamel<T> = T extends object
  ? T extends Array<infer U>
    ? Array<SnakeToCamel<U>> // If it's an array, transform its elements
    : {
        [K in keyof T as CamelCase<Extract<K, string>>]: SnakeToCamel<T[K]>
      }
  : T

type CamelCase<S extends string> = S extends `${infer A}_${infer B}`
  ? `${Uncapitalize<A>}${Capitalize<CamelCase<B>>}`
  : S

/**
 * Recursively changes key names to camelCase. Modifies the same object reference.
 * Supports snake_case.
 *
 * @param obj object
 * @throws {Error} if a rename of a key already exists
 * @returns the same object but keys are renamed to camelCase.
 */
function keysToCamelCase<T>(obj: T): SnakeToCamel<T> | T {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return obj

    return obj.map((value) => keysToCamelCase(value)) as SnakeToCamel<T>
  }

  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    console.error('Value must be of type Object!', obj)
    throw Error('Value must be of type Object!')
  }

  for (const [key, value] of Object.entries(obj)) {
    let newValue = value

    if (
      Array.isArray(value) ||
      Object.prototype.toString.call(value) === '[object Object]'
    ) {
      newValue = keysToCamelCase(value)
    }

    const [newKey, recased] = toCamelCase(key, 0, '_')

    // throw error if the expected newKey already exists
    if (recased && obj[newKey]) {
      console.error(
        `Renaming object field '${key}' to '${newKey}' but the field already exists`,
        obj
      )
      throw Error(
        `Renaming object field '${key}' to '${newKey}' but the field already exists`
      )
    }
    delete obj[key]
    obj[newKey] = newValue
  }

  return obj as SnakeToCamel<T>
}

export default keysToCamelCase
