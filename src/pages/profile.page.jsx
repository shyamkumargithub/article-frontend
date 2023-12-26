import React, { useState ,useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import axios from 'axios';
import { UserContext } from '../App';

const ProfilePage = () => {
    let {id:profileId}=useParams()

    const [profileData,setProfileData]=useState(null);
    const [loading, setLoading] = useState(false);

    let {userAuth:{username}} = useContext(UserContext)

      const getUserprofile = () => {
        setLoading(true);
        axios
          .get(`https://jsonplaceholder.typicode.com/users?name=${profileId}`)
          .then(({ data }) => {
            console.log("users data", data);

            setProfileData(data[0]);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      };
      useEffect(() => {
        resetState()
        getUserprofile();
      }, [profileId]);

      const resetState=()=>{
        setProfileData(null)
        setLoading(true)
      }


  return (
    <AnimationWrapper>
        {
            loading ? <Loader/> :
            <section className='h-cover md:flex flex-row-reverse items-start gap-5 min-[110px]:gap-12'>
                <div className='flex flex-col max-md:items-center gap-5 min-w-[250px]'>
                    <img
                     className='h-48 w-48 bg-grey rounded-full md:w-32 md:h-32'
                     src='https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D'/>
                    <h1 className='text-2xl font-medium'>@ {profileData?.username}</h1>
                    <p className='text-xl capitalize h-6'>{profileData?.name}</p>
                    <p> 10 Blogs 5 Reads</p>

                    <div className='flex gap-4 mt-2'>
                        {
                            profileId ==username
                            ?
                               <Link className='btn-light rounded-md' to="/settings/edit-profile"> Edit Profile</Link>
                             : ""
                        }
                    </div>
                </div>
            </section>  
        }
    </AnimationWrapper>
  )
}

export default ProfilePage