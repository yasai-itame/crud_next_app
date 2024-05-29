export type MemberType = {
  variant: 'Member'
  id: number
  name: string
  email: string
  age: number
  createdAt: string
  editSubmit?: (event: {variant: 'Member', id: number, name: string,email: string, age: number, createdAt: string}) => void
}