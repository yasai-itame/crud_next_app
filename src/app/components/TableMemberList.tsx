'use client'
import React, { useState, useEffect, useRef, RefObject, createRef } from 'react'

import { MemberType } from "../type/Member"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")

interface MemberList {
  member: MemberType[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (event: MemberType) => void
}

const TableMemberList: React.FC<MemberList> = ({ member, onChange, onClick }) => {
  
  const memberRefs = useRef<RefObject<HTMLInputElement>[]>([])
  member.forEach((_, i) => {
    memberRefs.current[i] = createRef<HTMLInputElement>()
  })

  const allCheckAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = (e.currentTarget as HTMLInputElement).checked
    if (check) {
      memberRefs.current.forEach((v): void => {
        if (v.current) {
          if (!v.current.checked) v.current.click()
        }
      })
    } else {
      memberRefs.current.forEach((v):void => {
        if (v.current) {
          if (v.current.checked) v.current.click()
        }
      })
    }
  }

  const iconName = (name: string) => {
    let names = name.split('')
    return names[0].toUpperCase()
  }

  const date = (date: string) => {
    return dayjs.tz(date).format('YYYY.MM.DD HH:mm:ss')
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th scope="col" className="ps-6 py-3 text-start">
              <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                <input type="checkbox" onChange={allCheckAction} className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main" />
                <span className="sr-only">Checkbox</span>
              </label>
            </th>
            <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Name
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  Created
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-end"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {
            member.map((v, i) => {
              return (
                <tr key={v.id}>
                  <td className="size-px whitespace-nowrap">
                    <div className="ps-6 py-3">
                      <label htmlFor={`member-${v.id}`} className="flex">
                        <input ref={memberRefs.current[i]} onChange={onChange} value={v.id} type="checkbox" className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id={`member-${v.id}`} />
                        <span className="sr-only">Checkbox</span>
                      </label>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                      <div className="flex items-center gap-x-3">
                        <span className="inline-flex items-center justify-center size-[38px] rounded-full bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700">
                          <span className="font-medium text-sm text-gray-800 leading-none dark:text-neutral-200">{iconName(v.name)}</span>
                        </span>
                        <div className="grow">
                          <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{v.name}</span>
                          <span className="block text-sm text-gray-500 dark:text-neutral-500">{v.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3">
                      <span className="text-sm text-gray-500 dark:text-neutral-500">{date(v.createdAt)}</span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-1.5">
                      <a onClick={() => onClick(v)} className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 cursor-pointer">
                        Edit
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableMemberList