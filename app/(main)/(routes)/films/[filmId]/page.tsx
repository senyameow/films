'use client'
import { Separator } from '@/components/ui/separator'
import { redirect, useParams } from 'next/navigation'
import React from 'react'
import Gallery from './_components/Gallery'
import MovieInfo from './_components/MovieInfo'
import RelatedMovies from '../_components/RelatedMovies'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import ReviewList from './_components/ReviewList'
import ModalProvider from '@/providers/ModalProvider'
import { useUser } from '@clerk/clerk-react'


const FilmPage = () => {

    const params = useParams()

    const film = useQuery(api.documents.movie, { id: params?.filmId as Id<'films'> })
    const reviews = useQuery(api.documents.getReviews, { filmId: params.filmId as Id<'films'> })

    const { user } = useUser()
    const userDB = useQuery(api.documents.getUserByEmail, { email: user?.emailAddresses[0].emailAddress! })

    if (film === null) return redirect('/films')

    if (film === undefined || reviews === undefined || userDB?._id === undefined) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }


    return (
        <div className='max-w-7xl mx-auto'>
            <ModalProvider />
            <div className='px-2 py-10 sm:px-2 lg:px-4'>
                <div className='lg:grid lg:grid-cols-12 lg:items-start gap-6 justify-between'>
                    <Gallery images={film?.screens!} />
                    <MovieInfo film={film!} />
                </div>
                <Separator className='my-10' />
                <RelatedMovies userId={userDB?._id} filmGenre={film.genre} />
                <Separator className='my-10' />
                <ReviewList film={film} reviews={reviews} />
            </div>
        </div>
    )
}

export default FilmPage