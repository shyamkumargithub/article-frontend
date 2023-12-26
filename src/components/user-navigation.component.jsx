import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import AnimationWrapper from '../common/page-animation';
import { removeSession,logOutUser } from '../common/session';

const UserNavigationPanel = () => {
    const {userAuth:{username},setUserAuth}=useContext(UserContext);
    const signOut=()=>{
      logOutUser('user');
        removeSession('user');
        setUserAuth({access_token:null})
    }
  return (
    <AnimationWrapper 
     className="absolute right-0 z-50"
    transition={{ duration: 0.2 }}>
      <div className="bg-white absolute right-0-border border-grey w-60  duration-200">
        <Link to={"/editor"} className="flex gap-2 link md:hiddden pl-8 py-4">
          <i className="fi fi-rr-file-edit" />
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Dashboard
        </Link>
        <Link to={`/dashboard/blogs`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to={`/settings/edot-profile`} className="link pl-8 py-4">
          Settings
        </Link>
        <span className='absolute border-t border-grey  w-[100%]'></span>
        <button onClick={signOut} className='text-left p-4 hover:bg-grey w-full pl-8 py-4'>
            <h1 className='font-bold text-xl mg-1'>Sign Out</h1>
            <p className='text-dark-grey'>@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}

export default UserNavigationPanel;