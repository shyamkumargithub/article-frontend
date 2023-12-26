import React from 'react'

const LoadMoreDataBtn = ({fetchDataFunc}) => {
    
    return (
    <div>
         <button onClick={()=>fetchDataFunc()} className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2'>Load More</button>
    </div>
  )
}

export default LoadMoreDataBtn