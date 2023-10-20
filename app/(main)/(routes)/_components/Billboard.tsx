import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

interface BillboardProps {
    film: Doc<'films'>
}

const Billboard = ({ film }: BillboardProps) => {
    return (
        <div className='relative top-0 h-[50.25vw]'>
            <video className='w-full object-cover h-full relative' autoPlay muted loop poster={film.cover_url} src={film.video_url}></video>
            <div className='absolute top-[30%] w-full h-full left-16'>
                <div className='flex items-start gap-2'>
                    <h2 className='text-3xl md:text-4xl xl:text-7xl font-bold'>{film.title}</h2>
                </div>
            </div>
        </div>
    )
}

export default Billboard