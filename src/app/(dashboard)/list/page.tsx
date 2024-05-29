'use client'
import useSWR from 'swr'
import ContentsBlock from '@/app/components/ContentsBlock'
import TableItemList from '@/app/components/TableItemList'
import SearchInput from '@/app/components/SearchInput'
import ToggleSwitch from '@/app/components/ToggleSwitch'
import Pagination from '@/app/components/Pagination'
import TestButtons from '@/app/components/TestButton'
import Loading from '@/app/components/LodingBlock'
import { useState, useEffect } from 'react'

interface Contents {
  id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  author: string
  date: string
  title: string
  content: string
}

interface Lists {
  contents: Contents[]
  limit: number
  offset: number
  totalCount: number
}

const fetcher = async (url:string) => {
  return await fetch(url).then((response) => {
    return response.json()
  })
}

const defaultLimit:number = 10

const List: React.FC = () => {
  const [offset, setOffSet] = useState(0)
  const [pageCurrent, setPageCurrent] = useState(1)

  const { data: list, error, isLoading } = useSWR<Lists>(`/api/microcms?offset=${offset}&limit=${defaultLimit}`, fetcher)

  const totalCountCheck = (totalCount: number | undefined):totalCount is number => {
    return typeof totalCount == 'number'
  }

  const pagerDisplay = () => {
    if (totalCountCheck(list?.totalCount)) {
      return list?.totalCount >= 11 ? true : false
    } else {
      return false
    }
  }

  /*
  useSWRの値をsetStateに入れて取り扱うのは無理かも
  */
  let lastPage = totalCountCheck(list?.totalCount) ? Math.ceil(list?.totalCount / 10) : 0
  
  /*test */
  const testEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log((e.target as HTMLButtonElement).value)
  }

  /*
  ページャークリック
  ↓
  遷移後別ウインドウを適当にクリック
  ↓
  画面に戻り、余白をクリック
  ↓
  APIが走ってしまう
  */
  
  //Pager Event
  const pagerEvent = (e: React.MouseEvent<HTMLButtonElement>):void => {
    let nextPageCurrent = Number((e.currentTarget as HTMLButtonElement).value)
    if (!isNaN(nextPageCurrent)) {
      console.log(nextPageCurrent)
      if (nextPageCurrent == 1) {
        setOffSet(0)
        setPageCurrent(1)
      } else {
        setOffSet((nextPageCurrent * 10) - 10)
        setPageCurrent(nextPageCurrent)
      }
    } else {
      if ((e.currentTarget as HTMLButtonElement).value == 'prev') {
        setOffSet(((pageCurrent - 1) * 10) - 10)
        setPageCurrent(pageCurrent - 1)
      }
      if ((e.currentTarget as HTMLButtonElement).value == 'next') {
        setOffSet(((pageCurrent + 1) * 10) - 10)
        setPageCurrent(pageCurrent + 1)
      }
      if ((e.currentTarget as HTMLButtonElement).value == 'first') {
        setOffSet(0)
        setPageCurrent(1)
      }
      if ((e.currentTarget as HTMLButtonElement).value == 'last') {
        setOffSet(lastPage)
        setPageCurrent(lastPage)
      }
    }
  }

  const listCheck = (data: Lists | undefined):data is Lists => {
    return typeof data !== 'undefined' && data !== null
  }

  const toggleSwitchAction = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const author = (e.currentTarget as HTMLInputElement).value

  }

  //useSWR使うのならuseStateで管理する意味がない
  //const [list, setList] = useState(lists?.contents)
  //pagerCheck ? <Pagination current={pageCurrent} lastPage={lastPage} /> : ''

  if (error !== undefined) {
    return (
      <ContentsBlock>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{error}</h2>
      </ContentsBlock>
    )
  }

  if (isLoading) {
    return (
      <ContentsBlock>
        <Loading />
      </ContentsBlock>
    )
  }

  return (
    <ContentsBlock>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <div>
            <SearchInput />
          </div>
          <ToggleSwitch title="Author Only" onChange={toggleSwitchAction} />
          
          {/* <TestButtons testEvent={testEvent} num={10} />

          <TestButtons testEvent={testEvent} /> */}
          
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap w-1/6">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                Author
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap w-1/6">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                Date
              </span>
            </th>
            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                Title
              </span>
            </th>
          </tr>
        </thead>
        {
          listCheck(list) && <TableItemList items={list.contents} />
        }
      </table>
      {
        pagerDisplay() && <div className='p-6'><Pagination current={pageCurrent} lastPage={lastPage} onClick={pagerEvent} /></div>
      }
    </ContentsBlock>
  )
}

export default List