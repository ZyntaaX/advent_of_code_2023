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

function gcd (a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm (a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

export function findLCM (numbers: number[]): number {
  if (numbers.length < 2) {
    throw new Error('At least two numbers are required.')
  }

  let result = numbers[0]
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i])
  }

  return result
}
