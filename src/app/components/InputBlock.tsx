'use client'
import { useState } from "react"
import { MemberType } from "../type/Member"

interface Props {
  type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'password' | 'email'
  id: string
  mb?: string
  title: string
  value?: string
  disabled?: boolean,
  onValueChange: (event: string) => void
}

const InputBlock: React.FC<Props> = ({ type, id, mb, title, value, disabled, onValueChange }) => {

  const [values, setValue] = useState(value)

  const handleChange = (event: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    setValue(event.target.value);
  }

  const handleChange2 = (event: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    let a = (event.target as HTMLInputElement).value
    onValueChange(a)
  }

  if (type == 'text' || type == 'email' || type == 'password') {
    return (
      <div className={mb}>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ title }</label>
        <input type={type} onChange={handleChange2} id={id} value={values}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    )
  }
  if (type == 'textarea') {
    return (
      <div className={mb}>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ title }</label>
        <textarea onChange={handleChange} id={id} value={value} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
    )
  }

  if (type == 'checkbox') {
    return (
      <div className={`flex items-center ${mb}`}>
        <input onChange={handleChange} id={id} value={value} type="checkbox" disabled={disabled} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ title }</label>
      </div>
    )
  }

  if (type == 'radio') {
    return (
      <div className={`flex items-center ${mb}`}>
        <input onChange={handleChange} id={id} value={value} type="radio" disabled={disabled} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ title }</label>
      </div>
    )
  }
}

export default InputBlock