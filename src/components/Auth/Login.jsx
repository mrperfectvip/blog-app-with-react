import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { Input } from '../../../index'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loginUser = async (data) => {
    try {
      setLoading(true)
      setError('')
      const userData = await authService.userLogin(data)
      if (userData) {
        dispatch(login(userData))
        toast.success('Login Success🥳', {
          position: "top-left",
          autoClose: 2000,
          width: 100,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            width: "200px",
            height: " 40px"
          }
        });
        reset()
      }
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }

  }
  return (
    <div className='w-full min-h-screen px-2 sm:pt-30 pt-15 '>
      <h1 className='text-teal-400 text-center text-3xl mb-3'>Login</h1>
      <div className="signup max-w-sm mx-auto  bg-gray-900 w-full rounded">
        <form className='w-full p-4 min-h-96 justify-center flex flex-col items-center' onSubmit={handleSubmit(loginUser)}>

          <Input className='py-3' label="Email" type="email" placeholder='Enter your email' {...register('email', {
            required: { value: true, message: "Email field cannot be empty" },
            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "no user found with email in our database" }
          })} />
          {errors?.email && <p className='text-red-600 text-sm mb-1'>{errors.email?.message}</p>}

          <Input className='py-3' label="Password" type="password" placeholder='Enter your password' {...register('password', {
            required: { value: true, message: "Password field cannot be empty" },
            minLength: { value: 8, message: "invalid email or password" }
          })} />
          {errors?.password && <p className='text-red-600 text-sm mb-1'>{errors.password?.message}</p>}
          {error && <p className='text-red-600 text-sm mb-1'>{error}</p>}

          <button className='py-2  mt-5 px-10 rounded bg-teal-500 hover:bg-teal-700 transition-colors delay-100 text-white' type='submit'>{loading ? "Please wait..." : "Login"}</button>
          <h1 className='text-white/50 mt-5'>Don't have an Account ? <Link to='/signup' className='text-teal-400'>Signup</Link></h1>
        </form>
      </div>
    </div>
  )
}

export default Login
