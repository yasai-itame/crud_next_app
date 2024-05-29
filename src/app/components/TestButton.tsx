interface TestButton {
  num?: number
  testEvent: (e: React.MouseEvent<HTMLButtonElement>) => void
}
// const testEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
//   console.log((e.target as HTMLButtonElement).value)
// }

const TestButtons: React.FC<TestButton> = ({ testEvent, num = 50 }) => {
  return (
    <>
      <button onClick={testEvent} value={num}>{num}</button>
    </>
  )
}

export default TestButtons