import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/thunkFunction'
const RegisterPage = () => {
  const { register, watch, handleSubmit,
    formState: { errors }, reset } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = ({ email, password, name, confirmPassword }) => {
    if(password !== confirmPassword){
      return;
    }
    const body = {
      email,
      password,
      name,
      image: `https://via.placeholder.com/600x400?text=no+user+image`
    }
    dispatch(registerUser(body));
    reset();
  }
  const userName = {
    required: '必修項目です。'
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
  const confirmPassword = {
    required: '必修項目です。'

  }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>会員登録</h1>
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
            htmlFor='name'
            className='text-sm font-semibold text-gray-800'
          >名前</label>
          <input
            type='text'
            id='name'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('name', userName)}
          />
          {errors?.name &&
            <div>
              <span className='text-red-500'>
                {errors.name.message}
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
        <div className='mb-2'>
          <label htmlFor='confirmPassword'
          className='text-sm font-semibold text-gray-800'
          >
            password確認
          </label>
          <input 
          type ='password'
          id = 'confirmPassword'
          className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
          {...register('confirmPassword',
          {
            ...confirmPassword,
            validate : (value) => value === password.current || "Passwordが一致しません。"
          })}
          />
          {errors ?.confirmPassword && 
          <div>
            <span className='text-red-500'>
              {errors.confirmPassword.message}
            </span>
           </div> 
          }
         </div>
        <div className='mt-6'>
          <button type='submit' className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-200'>
            会員登録
          </button>
        </div>
        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          IDがあったら{" "}
          <a href='/login'
            className='font-medium hover: underline'>
            login
          </a>
        </p>
      </form>
    </section>
  )
}

export default RegisterPage