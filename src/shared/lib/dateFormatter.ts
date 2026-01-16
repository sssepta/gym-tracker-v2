export function getFormattedDateFromISO(date: string) {
  return new Date(getReplacedDate(date)).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function getReplacedDate(date: string) {
  return date.replace(
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    (_, y, m, d) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  )
}
