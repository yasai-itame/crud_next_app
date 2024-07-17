import React from 'react';
import getColorClass from '../utils/getColor';
interface Props {
  type?: string
  width?: string
  text: string
  color?: string
  disabled?: boolean
  mg?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<Props> = React.memo(({ type, width = '', text, color = '', disabled = false, mg, onClick }) => {

  const colorObj = getColorClass(color)

  const designStyle = `text-white ${colorObj.color1} ${colorObj.color2} focus:ring-4 focus:outline-none ${colorObj.color3} font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${colorObj.color4} ${colorObj.color5} ${colorObj.color6}`

  if (type == 'submit') {
    <button disabled={disabled} type="submit" onClick={onClick} className={`${designStyle} ${width} ${mg}`}>{ text }</button>
  }
  return (
    <button disabled={disabled} onClick={onClick} className={`${designStyle} ${width} ${mg}`}>{ text }</button>
  )
})

export default Button