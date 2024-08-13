export const isValidIP = (str: string) => {
  const parts = str.split('.')

  return parts.length === 4 &&
    parts.every(part => {
      if (part.startsWith('0')) {
        return part.length === 1
      }
      return part.match(/(\d+)/g) && !isNaN(+part) && +part < 256 && +part >= 0
    })
}

export const isValidDomain = (str: string) => {
  // if (!str.startsWith('https://') && !str.startsWith('http://')) return false

  const text = str.split('/').pop() || ''

  return (/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/g).test(text)
}