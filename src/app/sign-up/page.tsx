'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormInputBlock from '@/app/components/FormInputBlock'

const SignUp: React.FC = () => {
  type InputForm = {
    name: string
    email: string
    password: string
  }

  const { handleSubmit, control, reset } = useForm<InputForm>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<InputForm> = (data: InputForm) => {
    console.log(data)
    reset()
  }

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign Up</h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <FormInputBlock
                  id="name"
                  type="text"
                  mb="mb-2"
                  title="Name"
                  name={'name'}
                  control={control}
                  rules={{
                    required: { value: true, message: '名前は必須です。' },
                    maxLength: { value: 20, message: '名前は20文字までです。' }
                  }}
                />
                <FormInputBlock
                  id="email"
                  type="email"
                  mb="mb-2"
                  title="Email"
                  name={'email'}
                  control={control}
                  rules={{
                    required: { value: true, message: 'メールアドレスは必須です。' },
                    pattern: { value: /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i, message: 'メールアドレスの形式が違います。' }
                  }}
                />
                <FormInputBlock
                  id="password"
                  type="password"
                  mb="mb-2"
                  title="Password"
                  name={'password'}
                  control={control}
                  rules={{
                    required: { value: true, message: 'パスワードは必須です。' },
                    pattern: { value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,20}$/i, message: 'パスワードの形式が違います。半角英字と半角数字それぞれ1文字以上含む8文字以上20文字以下にしてください。' }
                  }}
                />
                <button
                  type={'submit'}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp