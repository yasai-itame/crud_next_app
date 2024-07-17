'use client'
import 'setimmediate'
import { MemberType } from '../../type/Member'
import { CreateMemberType } from '@/app/type/CreateMember'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import useSWR from 'swr'
import fontkit from '@pdf-lib/fontkit'
import { PDFDocument, rgb } from 'pdf-lib'
import ContentsBlock from '@/app/components/ContentsBlock'
import TableMemberList from '@/app/components/TableMemberList'
import Loading from '@/app/components/LodingBlock'
import Button from '@/app/components/Button'
import EditMemberModal from '@/app/components/EditMemberModal'
import CreateMemberModal from '@/app/components/CreateMemberModal'
import isError from '@/app/utils/isError'

interface Props {
  member: MemberType
}

const fetcher = async (url:string) => {
  const result = await fetch(url)
  if (isError(result)) {
    if (!result.success) {
      alert(result.message)
    }
  }
  return result.json()
}

// 初回表示用
(async () => {
  const result = await fetch('/api/member?page=1')
  if (isError(result)) {
    if (!result.success) {
      alert(result.message)
    }
  }
  const member = await result.json()
  return {
    props: {
      member
    }
  }
})()

const Member: React.FC<Props> = (props) => {
  const [idValue, setIdValue] = useState<number[]>([])
  const [font, setFont] = useState<ArrayBuffer>(new ArrayBuffer(0))
  const [editData, setEditData] = useState<MemberType>({ id: 0, name: '', email: '', age: 0, createdAt: '' })
  const [createData, setCreateData] = useState<CreateMemberType>({ name: '', email: '', age: 0, password: '' })
  const [pager, setPager] = useState<number>(1)
  const readApi = useRef<HTMLDivElement>(null)
  const editButtonModalRef = useRef<HTMLButtonElement>(null)
  const createbuttonModalRef = useRef<HTMLButtonElement>(null)
  const anchorCsvRef = useRef<HTMLAnchorElement>(null)
  const anchorPdfRef = useRef<HTMLAnchorElement>(null)
  const anchorPuppeteerRef = useRef<HTMLAnchorElement>(null)

  const { data: members, error: errors, isLoading, mutate } = useSWR(`/api/member?page=${pager}`, fetcher, {
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

  const editAction = useCallback((data: MemberType) => {
    if (!editButtonModalRef.current) return

    setEditData((prevData) => ({
      ...prevData,
      variant: 'Member',
      id: data.id,
      name: data.name,
      email: data.email,
      age: data.age,
      createdAt: data.createdAt
    }))

    editButtonModalRef.current.click()
  }, [])

  const editSubmitAction = useCallback(async () => {
    const result = await fetch('/api/member', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData)
    })
    if (!result.ok) {
      if (isError(result)) {
        if (!result.success) {
          alert(result.message)
        }
      }
      alert('登録に失敗しました。')
    } else {
      alert('登録が完了いたしました。')
      const update = () => {
        return members.map((v:MemberType) => {
          if (v.id == editData.id) {
            v.name = editData.name
            v.email = editData.email
          }
          return v
        })
      }
      await mutate(update())
    }
  }, [editData, members])

  const deleteAction = useCallback(async (data: MemberType) => {
    const check = confirm('削除します。よろしいですか？')
    if (check) {
      const result = await fetch('/api/member', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!result.ok) {
        if (isError(result)) {
          if (!result.success) {
            alert(result.message)
          }
        }
        alert('削除に失敗しました。')
      } else {
        alert('削除が完了いたしました。')
        await mutate(members)
      }
    }
  }, [members])

  const createAction = useCallback(() => {
    if (!createbuttonModalRef.current) return
    createbuttonModalRef.current.click()
  }, [createData])

  const createSubmitAction = useCallback(async () => {
    const check = confirm('新規登録します。よろしいですか？')
    if (check) {
      const result = await fetch('/api/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createData)
      })
      if (!result.ok) {
        if (isError(result)) {
          if (!result.success) {
            alert(result.message)
          }
        }
        alert('登録に失敗しました。')
      } else {
        alert('登録が完了いたしました。')
        await mutate(members)
      }
    }
  }, [createData, members]) 
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(async (entry) => {
      if (entry[0].isIntersecting) {
        setPager(pager + 1)
      }
    }, { threshold: 0.5 })
    if (readApi.current) {
      observer.observe(readApi.current)
    }
    return () => observer.disconnect()
  }, [readApi])

  return (
    <ContentsBlock>
      {
        isLoading ? <Loading /> :
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <h1 className="font-bold text-xl text-teal-400">Member List</h1>
              <div className="ml-3">
              <Button text="Create" color="green" onClick={createAction} />
              </div>
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
                members?.length != 0 ? <TableMemberList member={members} onChange={csvCheck} onEdit={editAction} onDelete={deleteAction} /> : <p>No Datas</p>
            }
            <div ref={readApi}></div>
        </div>
      }

      <div className="hidden">
        <button ref={editButtonModalRef} type="button" data-hs-overlay="#hs-edit-member-modal">
          Edit modal
        </button>
      </div>

      <div className="hidden">
        <button ref={createbuttonModalRef} type="button" data-hs-overlay="#hs-create-member-modal">
          Create modal
        </button>
      </div>

      <EditMemberModal {...editData} editSubmit={editSubmitAction} setEditData={setEditData} />

      <CreateMemberModal {...createData} createSubmit={createSubmitAction} setCreateData={setCreateData} />
      
    </ContentsBlock>
  )
}

export default Member