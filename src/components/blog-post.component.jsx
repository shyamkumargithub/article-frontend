import React from 'react'
import { getDay } from '../common/date'
import { Link } from 'react-router-dom'

const BlogPostCard = ({content,author}) => {
 
  return (
    <Link to={`/blog/${content.id}`} className='flex gap-8 items-center border-b border-grey pb-3 mb-4'>
      <div className="w-full ">
        <div className="flex gap-2 items-center ">
          <img src={author.profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {author.fullname} @ {author.username}
          </p>
          <p className="min-w-fit">{getDay(new Date())}</p>
        </div>
        <h1 className="blog-title mt-1">{content.title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {content.body}
        </p>
        <div className="flex gap-4 mt-7 items-center">
          <span className="btn-light py-1 px-4">{content.tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
        
            <i className="fi fi-rr-heart text-xl"></i>2
          </span>
        </div>
      </div>
      <div className='h-28 aspect-square bg-grey '>
        <img
         className='w-full h-full  aspect-square object-cover'
         src='https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
      </div>
    </Link>
  );
}

export default BlogPostCard