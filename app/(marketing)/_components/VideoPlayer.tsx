'use client'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const VideoPlayer = () => {

    const random = useQuery(api.documents.getRandomFilm)

    return (
        <div className=' flex-row gap-3 items-center'>
            <div className='relative w-[600px] sm:w-[650px] h-[300px] sm:h-[350px] md:w-[900px] md:h-[400px]'>
                <video src={random?.video_url} muted autoPlay loop className='object-contain' controls />
            </div>
        </div>
    )
}

export default VideoPlayer