export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} мин`
  }
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}ч ${m}м` : `${h}ч`
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}
