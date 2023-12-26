import React, { createContext, useEffect, useState } from 'react'
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getDay } from '../common/date';
import BlogInteraction from '../components/blog-interaction.component';


export const BlogContext= createContext({})
const BlogPage = () => {
   const [data,setData]=useState(null)
   const [loading,setLoading]=useState(false)

       const getBlogdetails = () => {
        setLoading(true)
         axios
           .get(`https://dummyjson.com/posts/1`)
           .then(({ data }) => {
             console.log("users data", data);

             setData(data);
             setLoading(false)
           })
           .catch((err) => {
            setLoading(false)
             console.log(err);
           });
       };
       useEffect(()=>{
            getBlogdetails();
       },[])

  return (
    <AnimationWrapper>
      {loading && data == null ? (
        <Loader />
      ) : (
        <BlogContext.Provider value={{data,setData}}>
          <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
            <img
              className="aspect-video"
              src={
                "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*HQLfs7WrGlZbjMa4dJKzmQ.png"
              }
            />
            <div className="mt-12">
              <h2>{data?.title}</h2>
              <div className="flex max-sm:flex-col justify-between my-8">
                <div className="flex gap-5 items-start">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D"
                    }
                  />
                  <p>Terry Medhurst</p>
                  <br />
                  <Link to={`/user/atuny0}`}>atuny0</Link>
                </div>
                <p className="text-dark-grey opacity-75max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                  Published on {getDay(new Date())}
                </p>
              </div>
            </div>
            <BlogInteraction></BlogInteraction>
            <p>{data?.body }</p>
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
}

export default BlogPage