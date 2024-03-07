export function getShortName(name: string) {
  const nameSplittedBySpace = name.split(' ')

  if (nameSplittedBySpace.length === 1) {
    return name[0].toUpperCase()
  }

  return `${nameSplittedBySpace[0][0].toUpperCase()}${nameSplittedBySpace[
    nameSplittedBySpace.length - 1
  ][0].toUpperCase()}`
}
