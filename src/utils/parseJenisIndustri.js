export function parseJenisIndustri(val) {
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    // jika string sudah berbentuk JSON array (ada [ dan ])
    if (val.trim().startsWith('[')) {
      try {
        return JSON.parse(val)
      } catch {
        // fallback: split manual
      }
    }
    // jika cuma string biasa, misal: "Pengelasan, Migas"
    return val
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  }
  return []
}
