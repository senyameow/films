import Image from 'next/image'
import React from 'react'

const VideoPlayer = () => {
    return (
        <div className='flex flex-row gap-3 items-center'>
            <div className='relative w-[600px] sm:w-[650px] h-[300px] sm:h-[350px] md:w-[900px] md:h-[400px]'>
                <Image src={'/documents-dark.png'} alt='' fill className='object-contain dark:block hidden' />
            </div>
        </div>
    )
}

export default VideoPlayer