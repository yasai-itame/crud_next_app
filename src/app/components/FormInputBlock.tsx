import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type Props = {
  mb: string
  id: string
  title: string
  type: string
}

type FormInputBlockProps<T extends FieldValues> = UseControllerProps<T> & Props

const FormInputBlock = <T extends FieldValues>(props: FormInputBlockProps<T>) => {
  const { mb, id, title, type, name, control, rules } = props
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState
  return (
    <div className={mb}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ title }</label>
      <input {...field} type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error ? error.message : ""}</p>
    </div>
  )
}

export default FormInputBlock