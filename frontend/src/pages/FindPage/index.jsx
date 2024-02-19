import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { findUser } from '../../store/thunkFunction';
const FindPage = () => {
  const { 
    register,handleSubmit,
    formState: { errors }, reset } = useForm({ mode: 'onChange' })

  const dispatch = useDispatch();

  const onSubmit = ({ email }) => {
    const body = {
      email,
    }
    dispatch(findUser(body));
    reset();
  }
  const userEmail = {
    required: '必修項目です。'
  }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>ユーザIDの確認・パスワードの再設定</h1>
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
        <div className='mt-6'>
          <button type='submit' className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-200'>
            本人確認
          </button>
        </div>
        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          IDを持っていなかったら{" "}
          <a href='/register'
            className='font-medium hover: underline'>
            会員登録
          </a>
        </p>
        <p className='mt-8 text-xs font-light text-center text-gray-700'>
         IDを持っていたら{" "}
          <a href='/login'
            className='font-medium hover: underline'>
          ログイン
          </a>
        </p>
      </form>
    </section>
  )
}

export default FindPage