export function formatTime (time: any, format: string) {
  const date = new Date(time)

  if (format == 'eu') {
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    const formattedDate = ` ${day}.${month}.${year} ${hours}.${minutes}`
    return formattedDate
  }
}
