export function getMonthDays(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate()
  const offset = getMonthOffset(year, month)

  return {
    offset,
    days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
  }
}

function getMonthOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}
