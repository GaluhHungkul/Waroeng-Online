import Image, { ImageLoaderProps } from 'next/image'
import React from 'react'

const avatarLoader = ({ src } : ImageLoaderProps) => src

const UserAvatar = ({ username } : { username : string | null | undefined}) => {


  return (
    <div className="size-14 relative rounded-full  lg:ml-4 lg:size-24 overflow-hidden">
        <Image
        loader={avatarLoader}
        src={`https://ui-avatars.com/api/?name=${username ?? "Om Anton"}&background=random`}
        fill
        alt={username ?? ""}
        className='object-center object-cover'
        />
    </div>
  )
}

export default UserAvatar