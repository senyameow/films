'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { useAppDispatch } from '@/hooks/redux'
import useStoreUserEffect from '@/hooks/use-store-user'
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import { useQuery } from 'convex/react'
import { Info, Loader2, Video } from 'lucide-react'
import React, { useState } from 'react'

interface BillboardProps {
    film: Doc<'films'>;
    userId: Id<'users'>
}

const Billboard = ({ film, userId }: BillboardProps) => {

    const user = useQuery(api.documents.getUser, { id: userId })

    const dispatch = useAppDispatch()
    const { onOpen } = moreInfoSlice.actions


    return (
        <div className='relative top-0 h-[50.25vw] hidden sm:block'>
            <video className='w-full object-cover h-full relative' autoPlay muted loop poster={film.cover_url} src={film.video_url}></video>
            <div className='absolute top-[30%] w-fit h-full left-16'>
                <div className='flex items-start gap-6 flex-col'>
                    <h2 className='text-2xl md:text-3xl xl:text-7xl font-bold'>{film.title}</h2>
                    <div className='drop-shadow-xl shadow-black text-xl md:text-2xl xl:text-2xl max-w-[600px] font-semibold break-words overflow-hidden text-ellipsis h-[190px]'>{film.description}</div>
                    <div className='flex items-center gap-2'>
                        <Button className=''>
                            Watch Now
                            <Video className='w-4 h-4 ml-2' />
                        </Button>
                        <Button onClick={() => dispatch(onOpen({ film, user }))}>
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