'use client'
import React from 'react';
interface Props {
  type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'password' | 'email' | 'number'
  id: string
  mb?: string
  title: string
  value?: string | number
  disabled?: boolean,
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onTextareaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onCheckBoxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBlock: React.FC<Props> = React.memo(({ type, id, mb, title, value, disabled, onInputChange, onTextareaChange, onCheckBoxChange, onRadioChange }) => {

  if (type == 'text' || type == 'email' || type == 'password' || type == 'number') {
    return (
      <div className={mb}>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ title }</label>
        <input type={type} defaultValue={value} onChange={onInputChange} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    )
  }
  if (type == 'textarea') {
    return (
      <div className={mb}>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ title }</label>
        <textarea id={id} defaultValue={value} onChange={onTextareaChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
    )
  }

  if (type == 'checkbox') {
    return (
      <div className={`flex items-center ${mb}`}>
        <input type="checkbox" defaultValue={value} onChange={(onCheckBoxChange)} id={id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ title }</label>
      </div>
    )
  }

  if (type == 'radio') {
    return (
      <div className={`flex items-center ${mb}`}>
        <input type="radio" defaultValue={value} onChange={onRadioChange} id={id} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ title }</label>
      </div>
    )
  }
})

export default InputBlock