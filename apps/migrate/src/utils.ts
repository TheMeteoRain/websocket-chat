const trimTrailingParenthesis = (text: string) => {
  const indexOfOpeningParenthesis = text.indexOf('(')
  if (indexOfOpeningParenthesis !== -1) {
    return text.slice(0, indexOfOpeningParenthesis)
  }

  return text
}

export const DROP = (string: string) => {
  const stringArray = string.split(' ')

  if (stringArray[1].toLocaleUpperCase().match('FUNCTION')) {
    return `DROP FUNCTION ${trimTrailingParenthesis(stringArray[2])}`
  } else if (stringArray[1].toLocaleUpperCase().match('TYPE')) {
    return `DROP TYPE ${trimTrailingParenthesis(stringArray[2])}`
  } else if (stringArray[1].toLocaleUpperCase().match('TRIGGER')) {
    return `DROP TRIGGER ${stringArray[2]} ON ${stringArray[7]}`
  }

  throw Error('Drop() function only supports functions, types or triggers.')
}
