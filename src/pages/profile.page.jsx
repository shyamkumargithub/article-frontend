import React, { useState ,useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import axios from 'axios';
import { UserContext } from '../App';
import AboutUser from '../components/about.component';
import InPageNavigation from '../components/inpage-navigation.component';
import NoDataMessage from '../components/nodata.component';
import BlogPostCard from '../components/blog-post.component';
import LoadMoreDataBtn from '../components/load-more.component';

const ProfilePage = () => {
    let {id:profileId}=useParams()
    let {userAuth:{username}} = useContext(UserContext)

    const [profileData,setProfileData]=useState(null);
    const [loading, setLoading] = useState(false);
    const [blogs,setBlogs]=useState(null)
    const [page,setPage] = useState(0)

     const fetchBlogsByUser = () => {
       axios
         .get(`https://dummyjson.com/posts?page=${page}&limit=5`)
         .then(({ data }) => {
           console.log("asdasdas", data.posts);
           if (page == 0) {
             setBlogs(data.posts);
           } else {
             setBlogs([...blogs, ...data.posts]);
           }
           setPage(page + 1);
         })
         .catch((err) => {
           console.log(err);
         });
     };


     useEffect(()=>{
        fetchBlogsByUser();
     },[page])
    

      const getUserprofile = () => {
        setLoading(true);
        console.log('------profile id',profileId,'=====username ',username)
        axios
          .get(`https://jsonplaceholder.typicode.com/users?name=Leanne Graham`)
          .then(({ data }) => {
            console.log("==========users data", data);

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
        setBlogs(null )
        setLoading(true)
      }


  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[110px]:gap-12">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10">
            <img
              className="h-48 w-48 bg-grey rounded-full md:w-32 md:h-32"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D"
            />
            <h1 className="text-2xl font-medium">@ {profileData?.username}</h1>
            <p className="text-xl capitalize h-6">{profileData?.name}</p>
            <p> 10 Blogs 5 Reads</p>

            <div className="flex gap-4 mt-2">
              {profileId == username ? (
                <Link
                  className="btn-light rounded-md"
                  to="/settings/edit-profile"
                >
                  {" "}
                  Edit Profile
                </Link>
              ) : (
                ""
              )}
            </div>
            <AboutUser
              className="max-md:hidden"
              bio={""}
              social_links={[
                { youtube: "https://www.youtube.com/" },
                { instagram: "https://www.instagram.com/" },
                { facebook: "https://www.facebook.com/" },
              ]}
              joinedAt={new Date().toISOString()}
            />
          </div>

          {/* blogs page */}
          <div className="max-md:mt-12 w-full">
            <InPageNavigation
              routes={["Blogs Published", "About"]}
              defaultHidden={["About"]}
            >
              <>
                {blogs == null ? (
                  <Loader />
                ) : blogs.length ? (
                  blogs.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        key={i}
                        transition={{ duration: 1, delay: i * 1 }}
                      >
                        <BlogPostCard
                          content={blog}
                          author={{
                            fullname: "Leanne Graham",
                            username: "Bret",
                            profile_img:
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
                          }}
                        />
                      </AnimationWrapper>
                    );
                  })
                ) : (
                  <NoDataMessage message={"No Blogs published"} />
                )}

                <LoadMoreDataBtn fetchDataFunc={fetchBlogsByUser} />
              </>
              <>
                <AboutUser
                  className="max-md:hidden"
                  bio={""}
                  social_links={[
                    { youtube: "https://www.youtube.com/" },
                    { instagram: "https://www.instagram.com/" },
                    { facebook: "https://www.facebook.com/" },
                  ]}
                  joinedAt={new Date().toISOString()}
                />
              </>
            </InPageNavigation>
          </div>
        </section>
      )}
    </AnimationWrapper>
  );
}

export default ProfilePage