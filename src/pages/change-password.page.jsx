import React, { useRef } from 'react'
import AnimationWrapper from '../common/page-animation'
import InputBox from '../components/input.component'

import {toast, Toaster } from 'react-hot-toast';
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const ChangePassword = () => {
    
    let changePasswordForm = useRef();
    const handleSubmit=(e)=>{
        e.preventDefault();
        let form = new FormData(changePasswordForm.current);
        let formData = {};
        for( let [key,value] of  form.entries()){
            formData[key]=value;
        }
        let {currentPassword, newPassword} = formData
        if(!currentPassword.length || !newPassword.length){
            return toast.error("Fill all the inputs")
        }
        if(!passwordRegex.test(currentPassword) ||!passwordRegex.test(newPassword)){
            return toast.error("Password should be 6 to 20 characters long with a numeric ,1 lowecase and 1 uppercase letters");
        }

        e.target.setAttribute("disabled",true)
        let loadingToast=toast.loading('Updating.....')
  }

  return (
    <AnimationWrapper>
    <Toaster/>
      <form ref={changePasswordForm}>
        <h1 className="max-md:hidden">Change Password</h1>
        <div className='py-10 w-full md:max-w-[400px]'>
          <InputBox
            name={"currentPassword"}
            type={"password"}
            className="profile-edit-input"
            placeholder={"Current Password"}
            icon={"fi-rr-unlock"}
          />
          <InputBox
            name={"newPassword"}
            type={"password"}
            className="profile-edit-input"
            placeholder={"New Password"}
            icon={"fi-rr-unlock"}
          />
          <button onClick={handleSubmit} className='btn-dark px-10' type='submit'>Change Password</button>
        </div>
      </form>
    </AnimationWrapper>
  );
}

export default ChangePassword