'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useAppSelector } from '@/hooks/redux'
import { useQuery } from 'convex/react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { redirect, useParams, useRouter } from 'next/navigation'
import React from 'react'

const Player = () => {

    const params = useParams()
    const router = useRouter()

    const film = useQuery(api.documents.movie, { id: params.movieId as Id<'films'> })


    if (film === undefined) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    if (film === null) return redirect('/films')


    return (
        <div className='h-screen w-screen bg-black'>
            <nav className='fixed z-10 flex items-center p-4 pag-8'>
                <ArrowLeft onClick={() => { router.back() }} className='w-8 h-8' role='button' />
                <div className='text-white flex items-center gap-4'>
                    <span>Watching: </span>
                    <span>{film.title}</span>
                </div>
            </nav>
            <video src={film?.video_url} className='w-full h-full' controls></video>
        </div>
    )
}

export default Player