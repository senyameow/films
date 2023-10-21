'use client'
import React from 'react'
import Billboard from '../_components/Billboard'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
import MovieList from './_components/MovieList'
import ModalProvider from '@/providers/ModalProvider'

const Home = () => {

    const film = useQuery(api.documents.getRandomFilm)

    if (film === undefined) {
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
                <Billboard film={film} />
                <MovieList />
            </div>
        </>
    )
}

export default Home