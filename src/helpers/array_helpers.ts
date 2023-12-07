export function groupBy<T, K> (array: T[], keyGetter: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>()
  array.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (collection == null) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}
