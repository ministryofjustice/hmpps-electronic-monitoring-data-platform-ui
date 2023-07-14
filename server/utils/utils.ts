import { SanitisedError } from '../sanitisedError'

const properCase = (word: string): string =>
  word.length >= 1 ? word[0].toUpperCase() + word.toLowerCase().slice(1) : word

const isBlank = (str: string): boolean => !str || /^\s*$/.test(str)

/**
 * Converts a name (first name, last name, middle name, etc.) to proper case equivalent, handling double-barreled names
 * correctly (i.e. each part in a double-barreled is converted to proper case).
 * @param name name to be converted.
 * @returns name converted to proper case.
 */
const properCaseName = (name: string): string => (isBlank(name) ? '' : name.split('-').map(properCase).join('-'))

export const convertToTitleCase = (sentence: string): string =>
  isBlank(sentence) ? '' : sentence.split(' ').map(properCaseName).join(' ')

export const initialiseName = (fullName?: string): string | null => {
  // this check is for the authError page
  if (!fullName) return null

  const array = fullName.split(' ')
  return `${array[0][0]}. ${array.reverse()[0]}`
}

export type ApiResponse<K extends string, T> = Prettify<
  { error: string } & {
    [k in K]: T
  }
>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & object

export const AddYears = (years: number, date: Date): Date => {
  const YearOffset = 1000 * 60 * 60 * 24 * 365
  const tempDate = new Date()
  tempDate.setTime(date.getTime() + YearOffset * years)
  return tempDate
}

export const isSanitisedError = (error: any): error is SanitisedError => {
  if (typeof error === 'string') {
    return false
  }
  return Object.prototype.hasOwnProperty.call(error, 'text')
}
