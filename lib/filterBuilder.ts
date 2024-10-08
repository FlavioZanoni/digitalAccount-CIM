type Filter = {
  key: string
  value: number | string
}

export function equals(key: string, value: number | string) {
  return `${key}=${value}`
}

export function filterBuilder(filters: Filter[]) {
  if (!filters.length) return ""
  return "&" + filters.map(({ key, value }) => equals(key, value)).join("&")
}
