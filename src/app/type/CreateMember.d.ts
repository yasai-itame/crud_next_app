export type CreateMemberType = {
  name: string
  email: string
  age: number
  password: string
  setCreateData?: React.Dispatch<React.SetStateAction<CreateMemberType>>
  createSubmit?: () => void
}