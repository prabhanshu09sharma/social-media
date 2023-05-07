import React from 'react'
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from 'react-icons/bs'
import SidebarLink from './SidebarLink'
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi'
import { HiOutlineClipboardList, HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'


function SideBar() {
    const { data: session } = useSession();
    return (
        <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px]
            p-2 fixed h-full border-r border-gray-400 pr-0 xl:pr-8 '>
            <div className='flex items-center justify-center w-14 h-14 hoverEffect p-0
                xl:ml-24'>
                <BsTwitter className='text-white text-[34px]' />
            </div>
            <div className=' mt-4  mb-1 xl:m-20'>
                <SidebarLink text="Home" Icon={AiFillHome} />
                <SidebarLink text="Explore" Icon={BiHash} />
                <SidebarLink text="Notifications" Icon={BsBell} />
                <SidebarLink text="Messages" Icon={AiOutlineInbox} />
                <SidebarLink text="Bookmarks" Icon={BsBookmark} />
                <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
                <SidebarLink text="Profile" Icon={AiOutlineUser} />
                <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
            </div>
            <button className='hidden xl:inline ml-auto text-white rounded-full bg-[#1d9bf0]
                w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]'>tweet</button>
            <div className='text-[#d9d9d9] flex items-center justify-center mt-auto hoverEffect
                    xl:ml-auto xl:-mr-5 px-4 py-2' onClick={signOut}>
                <Image src={session?.user?.image}
                    alt="image"
                    width={50}
                    height={50}
                    className='h-10 w-10 rounded-full xl:mr-2.5' />
                <div className='hidden xl:inline leading-5 '>
                    <h4 className='font-bold '>{session?.user?.name}</h4>
                    <h4 className='text-[#6e767d] '>@{session?.user?.tag}</h4>
                </div>
                <BsThreeDots className='h-5 hidden xl:inline ml-10' />
            </div>
        </div>
    )
}

export default SideBar
