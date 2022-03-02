import { format } from 'date-fns'

export const formatDate = (date: Date | string | undefined | null) => {
  if (!date) return ''
  return format(new Date(date), 'dd/MM/yyyy')
}
