import React from 'react'
import { Link } from 'react-router-dom'
import { getDay } from '../common/date';
const MinimalBlogPost = ({content,author,index}) => {
  return (
    <Link to={`/blog/${content.id}`} className="flex gap-5 mb-8">
      <h1 className="blog-index"> {index < 10 ? "0" + (index + 1) : index}</h1>

      <div>
        <div className="flex gap-2 items-center ">
          <img src={author.profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {author.fullname} @ {author.username}
          </p>
          <p className="min-w-fit">{getDay(new Date())}</p>
        </div>
        <h1 className='blog-title'>{content.title}</h1>
      </div>
    </Link>
  );
}

export default MinimalBlogPost