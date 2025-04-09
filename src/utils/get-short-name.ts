export function getShortName(name: string) {
  const splittedName = name.split(' ')

  return `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`.toUpperCase()
}
