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

function pluralizeRu(count: number, forms: [string, string, string]): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

export function formatRelativeDayLabel(isoDate: string): string {
  const date = new Date(isoDate)
  const startOfDay = (d: Date): number => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const diffDays = Math.round((startOfDay(new Date()) - startOfDay(date)) / 86_400_000)

  if (diffDays <= 0) return 'Сегодня'
  if (diffDays === 1) return 'Вчера'
  if (diffDays < 30) return `${diffDays} ${pluralizeRu(diffDays, ['день', 'дня', 'дней'])} назад`
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}
