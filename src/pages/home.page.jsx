import React, { useEffect, useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation, { activeTabRef } from '../components/inpage-navigation.component'
import axios from 'axios'
import Loader from '../components/loader.component'
import BlogPostCard from '../components/blog-post.component'
import MinimalBlogPost from '../components/nobanner-blog-post.component'
import NoDataMessage from '../components/nodata.component'
import { filterPaginationData } from '../common/filter-pagination-data'
import LoadMoreDataBtn from '../components/load-more.component'

const HomePage = () => {

    let [blogs,setBlogs] = useState(null)
    let [trendingBlogs,setTrendingBlogs] =useState(null)
    let [pageState,setPageState]=useState("home")
    const [page,setPage]=useState(0)
    
    let categories = ['programming','hollywood','film making','social media','cooking','technology','finances','travel']

    const fetchLatestBlogs =()=>{
        axios
          .get(`https://dummyjson.com/posts?page=${page}&limit=5`)
          .then(({ data }) => {
            console.log("asdasdas", data.posts);
             if(page==0){
                setBlogs(data.posts);
             }else{
                setBlogs([...blogs,...data.posts]);
             } 
             setPage(page+1)
             
           
          })
          .catch((err) => {
            console.log(err);
          });
    }

       const fetchBlogsByCategory = () => {
         axios
           .get("https://dummyjson.com/posts")
           .then(({ data }) => {
             console.log("asdasdas", data.posts);
             setBlogs(data.posts);
           })
           .catch((err) => {
             console.log(err);
           });
       };

       const fetchTrendingBlogs = () => {
         axios
           .get("https://dummyjson.com/posts")
           .then(({ data }) => {
             console.log("asdasdas", data.posts);
             setTrendingBlogs(data.posts);
           })
           .catch((err) => {
             console.log(err);
           });
       };

    const loadByCategory=(e)=>{
        let category=e.target.innerText;
        console.log('----',category)
        setBlogs(null)   
        if(pageState==category){
            setPageState("home")
            return ;
        }
        setPageState(category)
    }

   


    useEffect(()=>{
        activeTabRef.current.click()
        if(pageState=="home"){
            fetchLatestBlogs();
        }else{
            fetchBlogsByCategory()
        }

        if(!trendingBlogs){
            fetchTrendingBlogs();
        }
        
       
    },[pageState])


  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* latest article */}
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
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

              <LoadMoreDataBtn   fetchDataFunc={fetchLatestBlogs}/>
            </>
            <>
              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 1 }}
                    >
                      <MinimalBlogPost
                        content={blog}
                        author={{
                          fullname: "Leanne Graham",
                          username: "Bret",
                          profile_img:
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
                        }}
                        index={i}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"No Trending Blogs Found"} />
              )}
            </>
          </InPageNavigation>
        </div>

        {/* filter and trending blogs */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      onClick={loadByCategory}
                      key={i}
                      className={
                        pageState == category
                          ? " tag bg-black text-white"
                          : "tag"
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending<i className="fi fi-rr-arrow-trend-up"></i>
              </h1>
              <>
                {trendingBlogs == null ? (
                  <Loader />
                ) : trendingBlogs.length ? (
                  trendingBlogs.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        key={i}
                        transition={{ duration: 1, delay: i * 1 }}
                      >
                        <MinimalBlogPost
                          content={blog}
                          author={{
                            fullname: "Leanne Graham",
                            username: "Bret",
                            profile_img:
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
                          }}
                          index={i}
                        />
                      </AnimationWrapper>
                    );
                  })
                ) : (
                  <NoDataMessage message={"No Trending Blogs Found"} />
                )}
              </>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}

export default HomePage