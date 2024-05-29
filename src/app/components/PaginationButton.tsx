interface PaginationButton {
  current: number
  page: number | string
  lastPage: number
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const currentStyle = `min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-600 dark:border-gray-700 dark:text-white dark:focus:bg-gray-500`

const normalStyle = `min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`

const arrowStyle = `min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`

const PaginationButton: React.FC<PaginationButton> = ({ current, lastPage, page, onClick}) => {
  if (page == 'prev') {
    return (
      <button type="button" disabled={current == 1 ? true : false} className={arrowStyle} value={page} onClick={onClick}>
        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span aria-hidden="true" className="sr-only">Previous</span>
      </button>
    )
  }

  if (typeof page == 'number' && 7 >= lastPage) {
    return (
      <button type="button" disabled={current == page ? true : false} aria-current={current ? "page": false} className={normalStyle} value={page} onClick={onClick}>{ page }</button>
    )
  } else if (typeof page == 'number' && 8 <= lastPage) {
    /*
    max 8
    < 1 2 3 4 ... 8 >
    < 1 ... 5 6 7 8 >
    */
    
    //max 8< 1 2 3 4 ... 8 >
    if (8 == lastPage) {
      if (page <= 4 && current <= 4) {
        if (page <= 4) {
          return (
            <button type="button" disabled={current == page ? true : false} aria-current={current ? "page" : false} className={normalStyle} value={page} onClick={onClick}>{page}</button>
          )
        } else if (page == 5) {
          return (
            <button type="button" disabled className={normalStyle}>...</button>
          )
        } else if (page == lastPage) {
          return (
            <button type="button" aria-current="false" className={normalStyle} value={lastPage} onClick={onClick}>{lastPage}</button>
          )
        }
      } else if (current >= 5) {
        if (page == 2) {
          return (
            <button type="button" disabled className={normalStyle}>...</button>
          )
        } else {
          return (
            <button type="button" disabled={current == page ? true : false} aria-current={current ? "page" : false} className={normalStyle} value={page} onClick={onClick}>{page}</button>
          )
        }
      }
    } else {
      /*
      max 9 ~
      < 1 2 3 4 ... 9 >
      < 1 ... 4 5 6 ... 9 >
      < 1 ... 6 7 8 9 >
      */
      if (current <= 3) {
        if (page <= 4) {
          return (
            <button type="button" disabled={current == page ? true : false} aria-current={current ? "page" : false} className={normalStyle} value={page} onClick={onClick}>{page}</button>
          )
        } else if (page == 5) {
          return (
            <button type="button" disabled className={normalStyle}>...</button>
          )
        } else if (page == lastPage) {
          return (
            <button type="button" aria-current="false" className={normalStyle} value={lastPage} onClick={onClick}>{lastPage}</button>
          )
        }
      } else if (current <= lastPage - 4) {
        // < 1 ... 4 5 6 ... 9 >
        // < 1 ... 8 9 10 ... 21 >
        if (page == 1 || page == lastPage) {
          return (
            <button type="button" disabled={current == page ? true : false} aria-current={current ? "page" : false} className={normalStyle} value={page} onClick={onClick}>{page}</button>
          )
        } else if (page == 2 || page == lastPage - 1) {
          return (
            <button type="button" disabled className={normalStyle}>...</button>
          )
        } else if (current <= page && page <= current + 2 ) {
          return (
            <button type="button" disabled={current == page ? true : false} aria-current={current ? "page" : false} className={normalStyle} value={page} onClick={onClick}>{page}</button>
          )
        }
      } else {
        if (page == 1 || page >= lastPage - 3) {
          return (
            <button type="button" disabled={current == page ? true : false} aria-current={current ? "page" : false} className={normalStyle} value={page} onClick={onClick}>{page}</button>
          )
        } else if (page == 2) {
          return (
            <button type="button" disabled className={normalStyle}>...</button>
          )
        }
      }
    }
  }

  if ('next' == page) {
    return (
      <button type="button" disabled={current == lastPage ? true : false} className={arrowStyle} value={page} onClick={onClick}>
        <span aria-hidden="true" className="sr-only">Next</span>
        <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    )
  }
}

export default PaginationButton