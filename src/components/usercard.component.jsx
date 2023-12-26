import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
  return (
    <Link
      to={`/user/${user.username}`}
      className="flex gap-5 items-center mb-5"
    >
      <img src={user.image} className="w-14 h-14 rounded-full" />
      <div>
        <h1 className="font-medium text-xl line-clamp-2">
          {user.firstName} {user.lastName} 
        </h1>
        <p className="text-dark-grey">@ {user.username}</p>
      </div>
    </Link>
  );
}

export default UserCard