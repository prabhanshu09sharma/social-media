import React from 'react'

function SidebarLink({ text, Icon }) {
    return (
        <div className='text-[#d9d9d9] flex items-center justify-center 
            xl:justify-start text-xl space-x-3 hoverEffect px-2 py-1 w-fit'>
            <Icon />
            <span className='hidden xl:inline '>{text}</span>

        </div>
    )
}

export default SidebarLink
