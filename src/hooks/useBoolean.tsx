import { useRef, useState } from 'react'

type useBooleanReturn = [
  boolean,
  {
    toggle(): void
    on(): void
    off(): void
  }
]
export function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState(initialValue)

  const changeValue = useRef({
    toggle() {
      setValue((val) => !val)
    },
    on() {
      setValue(true)
    },
    off() {
      setValue(false)
    },
  })

  const returnValue: useBooleanReturn = [value, changeValue.current]
  return returnValue
}
