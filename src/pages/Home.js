import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'
import io from 'socket.io-client'

const Home = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const location = useLocation()

    console.log('user', user);
    const fetchUserDetails = async()=>{
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
            const res = await axios({
                url : URL,
                withCredentials : true
            })

            dispatch(setUser(res.data.data))
            if(res.data.data.logout){
                dispatch(logout())
                Navigate("/email")
            }
            console.log("Current user details", res);
        } catch (error) {
            console.log("error",error);
        }
    }
    useEffect(()=>{
        fetchUserDetails()
    },[])

    /**socket connection */
    useEffect(()=>{
        const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
            auth : {
                token : localStorage.getItem('token')
            },
        })

        socketConnection.on('onlineUser',(data)=>{
            console.log(data);
            dispatch(setOnlineUser(data))
        })

        dispatch(setSocketConnection(socketConnection))

        return ()=>{
            socketConnection.disconnect()
        }
    },[])

    const basePath = location.pathname === '/'
    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
                <Sidebar/>
            </section>
            {/**message componets */}
            <section className={`${basePath && "hidden"}`}>
                <Outlet/>
            </section>

            <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
                <div>
                    <img 
                        src={logo}
                        width={250}
                        alt='logo'
                        />
                </div>
                <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
            </div>
        </div>

    )
}

export default Home