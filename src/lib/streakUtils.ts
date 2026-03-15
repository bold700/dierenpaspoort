/**
 * Hulp voor streak en wekelijkse/maandelijkse doelen.
 * refDate optioneel voor testbaarheid (default: nu).
 */

export function getScansThisWeek(
  scanDates: string[],
  refDate: Date = new Date()
): number {
  const mon = new Date(refDate)
  mon.setDate(refDate.getDate() - ((refDate.getDay() + 6) % 7))
  const monStr = mon.toISOString().slice(0, 10)
  const sun = new Date(mon)
  sun.setDate(mon.getDate() + 6)
  const sunStr = sun.toISOString().slice(0, 10)
  return scanDates.filter((d) => d >= monStr && d <= sunStr).length
}

export function getScansThisMonth(
  scanDates: string[],
  refDate: Date = new Date()
): number {
  const prefix = refDate.toISOString().slice(0, 7)
  return scanDates.filter((d) => d.startsWith(prefix)).length
}

export function todayISO(refDate: Date = new Date()): string {
  return refDate.toISOString().slice(0, 10)
}

export function yesterdayISO(refDate: Date = new Date()): string {
  const d = new Date(refDate)
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}
