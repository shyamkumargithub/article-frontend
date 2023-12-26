import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InPageNavigation from '../components/inpage-navigation.component'
import NoDataMessage from '../components/nodata.component'
import LoadMoreDataBtn from '../components/load-more.component'
import BlogPostCard from '../components/blog-post.component'
import Loader from '../components/loader.component'
import axios from 'axios'
import AnimationWrapper from '../common/page-animation'
import UserCard from '../components/usercard.component'

const SearchPage = () => {
    let {query} = useParams()
    const [blogs,setBlogs]=useState(null)
    const [users,setUsers]=useState(null)


    const searchBlogs = () => {
        axios
          .get(`https://dummyjson.com/posts/search?skip=0&limit=15&q=`)
          .then(({ data }) => {
            console.log("asdasdas", data.posts);

            setBlogs(data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
      };

       const searchUsers = () => {
         axios
           .get(`https://dummyjson.com/users/search?q=${query}&page=0&limit=5`)
           .then(({ data }) => {
             console.log("users data", data.users);

             setUsers(data.users);
           })
           .catch((err) => {
             console.log(err);
           });
       };

    useEffect(()=>{
        searchBlogs()
        searchUsers()
    },[])  

   const UserCardWrapper=()=>{
      return(<>
        {
            users==null?<Loader/>:
            users.length?
            users.map((user,i)=>{
                return <AnimationWrapper key={i} transition={{duration:1,delay:i*0.8}}>
                    <UserCard user={user}/>
                </AnimationWrapper>
            }):
            <NoDataMessage message={'No User Found'}/>
        }
      </>)
   }


  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Results from ${query} `, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
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

            {/* <LoadMoreDataBtn fetchDataFunc={fetchLatestBlogs} /> */}
          </>
            <UserCardWrapper/>

        </InPageNavigation>
      </div>
      <div className='min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>
          <h1 className='font-medium text-xl mb-8'>User related to search <i className='fi fi-rr-user mt-1'></i></h1>
          <UserCardWrapper/>
      </div>
    </section>
  );
}

export default SearchPage
