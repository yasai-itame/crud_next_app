export type MemberType = {
  id: number
  name: string
  email: string
  age: number
  createdAt: string
  setEditData?: React.Dispatch<React.SetStateAction<MemberType>>
  editSubmit?: () => void
}