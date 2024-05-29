'use client'
import useSWR from 'swr'
import ContentsBlock from '@/app/components/ContentsBlock'
import InputBlock from '@/app/components/InputBlock'
import Button from '@/app/components/Button'
import Loading from '@/app/components/LodingBlock'
import useSWRMutation from 'swr/mutation'
import { useState, useEffect, FormEvent, useCallback } from 'react'

interface Submit {
  title: string
  comment: string
}

interface Error {
  [key: string]: any
}

const defaultLimit: number = 10

const fetcher = async (url:string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error:Error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  return res.json()
}

const postFetcher = async (url: string, { arg }: { arg: Submit }) => {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then((response) => {
    return response.json()
  })
}

const Comment: React.FC = () => {
  const { data: comments, error: errors, isLoading } = useSWR('/api/mamp', fetcher, {
    revalidateOnFocus: false,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // 404では再試行しない。
      if (error.status === 404) return
   
      // 再試行は10回までしかできません。
      if (retryCount >= 3) return
   
      // 5秒後に再試行します。
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  })
  const { data, trigger, isMutating, error } = useSWRMutation('/api/mamp', postFetcher)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')

  return (
    <>
      <ContentsBlock>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <InputBlock type="text" id="title" mb="mb-6" title="Title" onChange={(e) => setTitle(e.target.value)} />
          <InputBlock type="textarea" id="comment" mb="mb-6" title="Comment" onChange={(e) => setComment(e.target.value)} />
          
          <Button text="Submit" onClick={() => trigger({title: title, comment: comment})} />
          {
            isMutating && '更新中・・'
          }
        </div>
      </ContentsBlock>
      <ContentsBlock>
        {
          isLoading ? <Loading /> : <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-bold text-xl text-teal-400">Comment List</h1>
            <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
            {
              errors ? <p>Error</p> :
                comments?.length != 0 ? comments.map((v: any) => {
                  return (
                    
                      <li key={v.id} className="px-6 py-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-lg">{v.title}</span>
                          <span className="text-gray-500 text-xs">1 day ago</span>
                        </div>
                        <p className="text-gray-700">{v.comment}</p>
                      </li>
                  )
                }) : <li className="px-6 py-4">No Data</li>
              }
            </ul>
          </div>
        }
      </ContentsBlock>
    </>
  )
}

export default Comment