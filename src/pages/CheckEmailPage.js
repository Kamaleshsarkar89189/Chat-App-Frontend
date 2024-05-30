import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { FaRegCircleUser } from "react-icons/fa6";

const CheckEmailPage = () => {
  
    const [data, setData] = useState({
      email: "",
    })
  
    const Navigate = useNavigate()
    const handlerOnChange = (e) => {
      const { name, value } = e.target
      setData((preve) => {
        return {
          ...preve,
          [name]: value,

        }
      })
    }

   
    const handleSubmit = async (e) => {
      e.preventDefault()
      e.stopPropagation()

      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

      try {
        const res = await axios.post(URL, data)
        toast.success(res.data?.message)

        if (res.data.message) {
          setData({
            email: "",
          })
          Navigate('/password',{
            state : res?.data?.data
          })
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
      console.log("data", data);
    }
    // console.log("Photo",uploadPhoto);
    return (
      <div className='mt-5'>
        <div className='bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto'>

          <div className='w-fit mx-auto mb-2'>
            <FaRegCircleUser
            size={80}
            />
          </div>
          <h3>Welcome to Chat Application!</h3>

          <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>
            
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Email</label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='Enter your email'
                className='bg-slate-100 px-2 py-1 focus:outline-primary'
                value={data.email}
                onChange={handlerOnChange}
                required
              />
            </div>
            
            <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
              Login
            </button>
          </form>
          <p className='my-3 text-center'>Create an account ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
        </div>
      </div>
    )
  
 
}

export default CheckEmailPage