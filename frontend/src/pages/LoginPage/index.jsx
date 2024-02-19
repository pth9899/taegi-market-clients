import React from 'react'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import{loginUser}from '../../store/thunkFunction'
const LoginPage = () => {
  const { register, handleSubmit,
    formState: { errors }, reset } = useForm({ mode: 'onChange' })

    const dispatch = useDispatch();

    const onSubmit = ({ email, password }) => {
    const body = {
      email,
      password,
     }
    dispatch(loginUser(body));
    reset();
  }
  const userEmail = {
    required: '必修項目です。'
  }
  const userPassword = {
    required: '必修項目です。',
    minLength: {
      value: 6,
      message: '６字以上入力してください。'
    }
  }
  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>ログイン</h1>
      </div>
      <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2'>
          <label
            htmlFor='email'
            className='text-sm font-semibold text-gray-800'
          >Email</label>
          <input
            type='email'
            id='email'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('email', userEmail)}
          />
          {errors?.email &&
            <div>
              <span className='text-red-500'>
                {errors.email.message}
              </span>
            </div>
          }
        </div>
        <div className='mb-2'>
          <label
            htmlFor='password'
            className='text-sm font-semibold text-gray-800'
          >Password</label>
          <input
            type='password'
            id='password'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('password', userPassword)}
          />
           {errors?.password &&
            <div>
              <span className='text-red-500'>
                {errors.password.message}
              </span>
            </div>
          }
        </div>
        <div className='mt-6'>
          <button type='submit' className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-200'>
            Login
          </button>
        </div>
        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          IDを持っていなかったら{" "}
          <a href='/register'
            className='font-medium hover: underline'>
            会員登録
          </a>
        </p>
        <p className='mt-3 text-xs font-light text-center text-gray-700'>
        ユーザID・パスワードを忘れた場合{" "}
          <a href='/find'
            className='font-medium hover: underline'>
            ユーザIDの確認
          </a>
        </p>
      </form>
    </section>
  )
}

export default LoginPage
