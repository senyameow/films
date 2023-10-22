'use client'
import React from 'react'
import Billboard from '../_components/Billboard'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
import MovieList from './_components/MovieList'
import ModalProvider from '@/providers/ModalProvider'
import useStoreUserEffect from '@/hooks/use-store-user'

const Home = () => {

    const film = useQuery(api.documents.getRandomFilm)

    const userId = useStoreUserEffect()

    if (film === undefined || userId === null) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }


    return (
        <>
            <div className='absolute top-0 w-full h-full'>
                <ModalProvider />
                <Billboard film={film} userId={userId} />
                <MovieList userId={userId} />
            </div>
        </>
    )
}

export default Home