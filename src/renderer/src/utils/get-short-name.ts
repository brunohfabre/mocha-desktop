export function getShortName(name = '') {
  const splitted = name.split(' ')

  return (
    splitted[0][0].toUpperCase() +
    splitted[splitted.length - 1][0].toUpperCase()
  )
}
