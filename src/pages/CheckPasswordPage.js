import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const CheckPasswordPage = () => {

  const [data, setData] = useState({
    password : "",
  })

  const Navigate = useNavigate()
 const location = useLocation()
 const dispatch = useDispatch()

 useEffect(()=>{
  if(!location?.state?.name){
    Navigate('/email')
  }
 },[])
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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    try {
      const res = await axios({
        method : 'post',
        url : URL,
        data : {
          userId : location?.state?._id,
          password : data.password
        },
        withCredentials : true
      })
      toast.success(res.data?.message)


      if (res.data.success) {
        dispatch(setToken(res?.data?.token))
        localStorage.setItem('token', res?.data?.token)
        
        setData({
          password : "",
        })
        Navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    console.log("data", data);
  }
  // console.log("Photo",uploadPhoto);
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          {/* <FaRegCircleUser
            size={80}
          /> */}
          <Avatar
          width={70}
          height={70}
          name={location?.state?.name}
          imageUrl={location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
          
        </div>
        

        <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handlerOnChange}
              required
            />
          </div>

          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Login
          </button>
        </form>
        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot Password</Link></p>
      </div>
    </div>
  )


}

export default CheckPasswordPage