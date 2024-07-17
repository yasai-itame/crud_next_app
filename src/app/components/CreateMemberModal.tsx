'use client'
import React, { useCallback } from 'react'
import { CreateMemberType } from '../type/CreateMember'
import InputBlock from './InputBlock'
import Button from './Button'

const CreateMemberModal = React.memo(({ name, email, age, password, createSubmit, setCreateData }: CreateMemberType) => {

  const nameValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof setCreateData != 'undefined') {
      setCreateData((prev) => ({
        ...prev,
        name: event.target.value
      }))
    }
  }, [name])

  const ageValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof setCreateData != 'undefined') {
      setCreateData((prev) => ({
        ...prev,
        age: Number(event.target.value)
      }))
    }
  }, [age])

  const emailValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof setCreateData != 'undefined') {
      setCreateData((prev) => ({
        ...prev,
        email: event.target.value
      }))
    }
  }, [email])

  const passwordValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof setCreateData != 'undefined') {
      setCreateData((prev) => ({
        ...prev,
        password: event.target.value
      }))
    }
  }, [password])

  return (
    <div id="hs-create-member-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-4xl sm:w-full m-3 h-[calc(100%-3.5rem)] sm:mx-auto">
        <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-800">
            <h3 className="font-bold text-gray-800 dark:text-neutral-200">
              Create
            </h3>
            <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-neutral-700" data-hs-overlay="#hs-create-member-modal">
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div className="mt-5 p-4 mx-4 my-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
            <div className="mb-4 sm:mb-8">
              {
                <>
                  <InputBlock key="id-create-name" id="id-create-name" type="text" mb="mb-3" title="Name" value={name} onInputChange={(e) => nameValueChange(e)} />
                  <InputBlock key="id-create-age" id="id-create-age" type="number" mb="mb-3" title="Age" value={age} onInputChange={(e) => ageValueChange(e)} />
                  <InputBlock key="id-create-email" id="id-create-email" type="text" mb="mb-3" title="Email" value={email} onInputChange={(e) => emailValueChange(e)} />
                  <InputBlock key="id-create-password" id="id-create-password" type="password" mb="mb-3" title="password" value={password} onInputChange={(e) => passwordValueChange(e)} />
                  <div className="flex justify-end">
                    <Button text="Submit" color="blue" onClick={createSubmit} />
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CreateMemberModal