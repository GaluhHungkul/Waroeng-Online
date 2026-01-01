import Image, { ImageLoaderProps } from 'next/image'
import React from 'react'

const avatarLoader = ({ src } : ImageLoaderProps) => src

const UserAvatar = ({ username, navbar=false } : { username : string | null | undefined, navbar? : boolean}) => {


  return (
    <div className={` relative rounded-full  lg:ml-4  overflow-hidden ${navbar  ? "size-10 lg:size-12" : "size-14 md:size-24"}`}>
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