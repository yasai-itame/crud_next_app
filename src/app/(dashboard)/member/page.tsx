'use client'
import 'setimmediate'
import { MemberType } from "../../type/Member"
import React, { useState, useRef, useEffect } from 'react'
import useSWR from 'swr'
import fontkit from '@pdf-lib/fontkit'
import { PDFDocument, rgb } from 'pdf-lib'
import ContentsBlock from '@/app/components/ContentsBlock'
import TableMemberList from '@/app/components/TableMemberList'
import Loading from '@/app/components/LodingBlock'
import Button from '@/app/components/Button'
import ModalContents from '@/app/components/ModalContents'

interface Error {
  [key: string]: any
}

interface Props {
  member: MemberType
}

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

const putFetcher = async (url: string, req: MemberType) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(req)
  })
  if (!res.ok) {
    const error:Error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  return res.json()
}

(async () => {
  const members = await fetch('/api/member')
  const member = await members.json()
  return {
    props: {
      member
    }
  }
})()

const Member: React.FC<Props> = (props) => {
  const { data: members, error: errors, isLoading, mutate } = useSWR('/api/member', fetcher, {
    initialData: props.member,
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

  const [idValue, setIdValue] = useState<number[]>([])
  const [font, setFont] = useState<ArrayBuffer>(new ArrayBuffer(0))
  const [editData, setEditData] = useState<MemberType>({ variant: 'Member', id: 0, name: '', email: '', age: 0, createdAt: '' })
  const buttonModalRef = useRef<HTMLButtonElement>(null)
  const anchorCsvRef = useRef<HTMLAnchorElement>(null)
  const anchorPdfRef = useRef<HTMLAnchorElement>(null)
  const anchorPuppeteerRef = useRef<HTMLAnchorElement>(null)

  const editAction = (data: MemberType) => {
    if (!buttonModalRef.current) return
  
    setEditData({
      ...editData,
      variant: 'Member',
      id: data.id,
      name: data.name,
      email: data.email,
      age: data.age,
      createdAt: data.createdAt
    })

    buttonModalRef.current.click()
  }

  const editSubmitAction = async (data: MemberType) => {
    try {
      await fetch('/api/member', {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      console.log(data)
      //mutate({ ...data }, false)
    } catch (error) {

    } finally {

    }
  }
  
  const csvAction = () => {
    if (members?.length == 0 || !anchorCsvRef.current) return
    const headers: string[] = Object.keys(members[0])
    const values = members.map((v: MemberType[]) => {
      return [Object.values(v)]
    })
    const array = [headers].concat(values)
    const csvData = array.map((v) => v.join(',')).join('\n')

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = anchorCsvRef.current

    link.setAttribute('href', url)
    link.setAttribute('download', 'member_list.csv')
    link.click()

    /*
    let a = ['名前', '年齢', '住所']
    let values = [['a'], ['b'], ['c']]
    const array = [a].concat(values)
    let r = array.map((v) => v.join(',')).join('\n')
    console.log(r)
    */

  }

  const csvCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number((e.currentTarget as HTMLInputElement).value)
    const check = (e.currentTarget as HTMLInputElement).checked
    if (check) {
      setIdValue((prev) => {
        return [...prev, id]
      })
    } else {
      setIdValue((prev) => {
        return prev.filter((v:number) => v != id)
      })
    }
  }

  const pdfAction = async () => {
    if (members?.length == 0 || !anchorPdfRef.current) return
    const existingPdfBytes = await fetch('/pdf-template/member-template.pdf').then(res => res.arrayBuffer())
    // const pdfDoc = await PDFDocument.create()
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(font)
    // const page = pdfDoc.addPage()
    const pages = pdfDoc.getPages()
    const page = pages[0]
    const { width, height } = page.getSize()
    const font_color_base = rgb(0.1, 0.1, 0.1)
    page.drawText('メンバーリスト', {
      font: customFont,
      x: width - 90,
      y: height / 2 + 320,
      size: 11,
      color: font_color_base
    })
    const pdfBytes = await pdfDoc.save()

    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    const link = anchorPdfRef.current

    link.setAttribute('href', url)
    link.setAttribute('download', 'member_list.pdf')
    link.click()
  }

  const testAction = async () => {
    if (!anchorPuppeteerRef.current) return
    const pdfResponse = await fetch('/api/puppeteer', {
      method: 'GET'
    })
    const blob = await pdfResponse.blob()
    const url = URL.createObjectURL(blob)

    const link = anchorPuppeteerRef.current

    link.setAttribute('href', url)
    link.setAttribute('download', 'Puppeteer.pdf')
    link.click()
  }

  useEffect(() => {
    const setupFont = async () => {
      const fontBytes = await fetch('/fonts/ipaexg.ttf').then((res) => res.arrayBuffer() ) 
      setFont(fontBytes)
    }
    setupFont()
  }, [])

  return (
    <ContentsBlock>
      {
        idValue.map((v) => {
          return (
            <p key={v}>{ v }</p>
          )
        })
      }
      {
        isLoading ? <Loading /> :
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <h1 className="font-bold text-xl text-teal-400">Member List</h1>
              {/* <div className="ml-3">
                <Button text="CSV" disabled={members?.length == 0} onClick={csvAction} />
                <a ref={anchorCsvRef} className="invisible"></a>
              </div>
              <div className="ml-3">
                <Button text="PDF" disabled={members?.length == 0} onClick={pdfAction} />
                <a ref={anchorPdfRef} className="invisible"></a>
              </div>
              <div className="ml-3">
                <Button text="Puppeteer" onClick={testAction} />
                <a ref={anchorPuppeteerRef} className="invisible"></a>
              </div> */}
            </div>
            {
              errors ? <p>Error</p> :
                members?.length != 0 ? <TableMemberList member={members} onChange={csvCheck} onClick={editAction} /> : <p>No Datas</p>
            }
        </div>
      }

      <div className="hidden">
        <button ref={buttonModalRef} type="button" data-hs-overlay="#hs-member-modal">
          Open modal
        </button>
      </div>

      <ModalContents {...editData} editSubmit={editSubmitAction} />
      
    </ContentsBlock>
  )
}

export default Member