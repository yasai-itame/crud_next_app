import PaginationButton from './PaginationButton'
interface Pagination {
  current: number
  lastPage: number
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Pagination: React.FC<Pagination> = ({ current, lastPage, onClick }) => {

  const paginationElement = []
  for (let i = 1; i <= lastPage; i++) {
    paginationElement.push(i)
  }

  //Prev Arrow Add
  paginationElement.unshift('prev')

  //Next Arrow Add
  paginationElement.push('next')

  //PageMax 1~5
  if (lastPage <= 5) {
    return (
      <nav className="flex items-center -space-x-px">
        {
          paginationElement.map((v) => {
            return (
              <PaginationButton current={current} page={v} lastPage={lastPage} key={v} onClick={onClick}  />
            )
          })
        }
      </nav>
    )
  }

  //PageMax 6~
  return (
    <nav className="flex items-center -space-x-px">
      {
        paginationElement.map((v) => {
          return (
            <PaginationButton current={current} page={v} lastPage={lastPage} key={v} onClick={onClick}  />
          )
        })
      }
    </nav>
  )
}

export default Pagination