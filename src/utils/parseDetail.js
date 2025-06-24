export function parseDetail(val) {
  if (!val) return {}
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch {
      // fallback jika string biasa
      return {
        'Keahlian Teknis': val
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean),
      }
    }
  }
  if (typeof val === 'object') {
    return val
  }
  return {}
}
