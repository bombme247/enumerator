import { ChangeEvent } from "react"

type InputType = {
id: string
type: string
value: number
label: string
onChange: (event: ChangeEvent<HTMLInputElement>) => void
className: string
}

export const Input = ({id, type, value, label, onChange, className}: InputType) => {
  return (
    <div className="inputWrapper">
      <label htmlFor="maxValue">{label}</label>
      <input 
      id={id}
      type={type} 
      value={value}
      className={className}
      onChange={onChange } />
    </div>
  )
}