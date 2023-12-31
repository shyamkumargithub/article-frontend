import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import axios from 'axios'

const EditProfile = () => {
     
    let { userAuth :{ access_token }} = useContext(UserContext)
    const [profile,setProfile]=useState(null)
    useEffect(()=>{
            if(access_token){
                
            }
    },[])
  return (
    <div>EditProfile</div>
  )
}

export default EditProfile