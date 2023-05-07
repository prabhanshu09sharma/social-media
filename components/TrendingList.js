import Image from 'next/image'
import React from 'react'

const TrendingList = () => {
    return (
        <div className='mt-4 flex items-center'>
            <div>
                <p className='text-gray-500 text-[14px] mb-1'>Entertainment · LIVE</p>
                <h1 className='font-medium pr-2'>Bigg Boss 16: Salman Khan returns with a brand new season</h1>
            </div>

            <div>
                <Image src="/salman.webp"
                    height={75}
                    width={50}
                    alt='SujjestionImg'
                    className=' h-12 w-14 rounded-[20px]' />
            </div>
        </div>
    )
}

export default TrendingList