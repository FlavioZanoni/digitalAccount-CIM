export const formatDateArray = (date: string[]) => {
  const [year, month, day] = date
  return `${day}/${month}/${year}`
}
