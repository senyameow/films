'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { useAppDispatch } from '@/hooks/redux'
import useStoreUserEffect from '@/hooks/use-store-user'
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import { filmSlice } from '@/store/reducers/MovieSlice'
import { useQuery } from 'convex/react'
import { Info, Loader2, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface BillboardProps {
    film: Doc<'films'>;
    userId: Id<'users'>
}

const Billboard = ({ film, userId }: BillboardProps) => {

    const dispatch = useAppDispatch()
    const { onOpen } = moreInfoSlice.actions
    const router = useRouter()

    const onWatch = () => {
        router.push(`/films/watch/${film._id}`)
    }


    return (
        <div className='relative top-0 xl:h-[50.25vw] md:h-[60.25vw] sm:h-[70.25vw] hidden sm:block'>
            <video className='w-full object-cover h-full relative' autoPlay muted loop poster={film.cover_url} src={film.video_url}></video>
            <div className='absolute top-[30%] w-fit h-fit left-16'>
                <div className='flex items-start gap-6 flex-col'>
                    <h2 className='text-2xl md:text-3xl xl:text-7xl font-bold whitespace-nowrap'>{film.title}</h2>
                    <div className='drop-shadow-xl shadow-black text-xl md:text-2xl xl:text-2xl max-w-[600px] font-semibold break-words overflow-hidden text-ellipsis h-[190px]'>{film.description}</div>
                    <div className='flex items-center gap-2'>
                        <Button onClick={onWatch} className=''>
                            Watch Now
                            <Video className='w-4 h-4 ml-2' />
                        </Button>
                        <Button onClick={() => dispatch(onOpen({ film, userId }))}>
                            More Info
                            <Info className='w-4 h-4 ml-2' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Billboard