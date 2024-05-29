'use client'
import React, { useState, useEffect } from 'react'

interface ItemObj {
  id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  author: string
  date: string
  title: string
  content: string
}

interface ItemObjArray {
  items: ItemObj[]
}

const isArrayObj = (data: unknown): data is ItemObjArray => {
  return Array.isArray(data) && data.length >= 1
}

const dateAction = (date: unknown): string => {
  return 'a'
}

const TableItemList: React.FC<ItemObjArray> = ({ items = [] }:ItemObjArray) => {

  // propsは読み取り専用なのでuseStateで管理できない
  
  //NG
  // const [item, setItem] = useState<ItemObj[]>(items)
  // useEffect(() => {
  //   setItem([...item, items])
  // }, [])
  //NG

  //エラーは下記で対応できるかも
  //https://nextjs.org/docs/messages/react-hydration-error

  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {
        isArrayObj(items) ? items.map((v:ItemObj) => {
          return (
            <tr key={v.id}>
              <td className="size-px whitespace-nowrap px-6 py-3 w-1/6">
                <span className="text-sm text-gray-800 dark:text-white">{ v.author }</span>
              </td>
              <td className="size-px whitespace-nowrap px-6 py-3 w-1/6">
                <span className="text-sm text-gray-800 dark:text-white">{ dateAction(v.date) }</span>
              </td>
              <td className="size-px whitespace-nowrap px-6 py-3">
                <span className="text-sm text-gray-800 dark:text-white">{ v.title }</span>
              </td>
            </tr>
          )
        }) : `${<tr>
          <td colSpan={3} className="size-px whitespace-nowrap px-6 py-3">
            <span className="text-sm text-gray-800 dark:text-white">Data None</span>
          </td>
        </tr>}`
      }
    </tbody>
  )
}

export default TableItemList