import type { Dispatch, SetStateAction } from "react"

export default interface RadioControlProps {
  name: string,
  options: string[],
  selected: string,
  setSelected: Dispatch<SetStateAction<string>>
}