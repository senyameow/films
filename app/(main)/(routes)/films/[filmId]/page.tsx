'use client'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import React from 'react'
import Gallery from './_components/Gallery'
import MovieInfo from './_components/MovieInfo'
import RelatedMovies from '../_components/RelatedMovies'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'


const FilmPage = () => {

    const params = useParams()

    const film = useQuery(api.documents.movie, { id: params?.filmId as Id<'films'> })

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='px-2 py-10 sm:px-2 lg:px-4'>
                <div className='lg:grid lg:grid-cols-12 lg:items-start gap-6 justify-between'>
                    <Gallery images={film?.screens!} />
                    <MovieInfo />
                </div>
                <Separator className='my-10' />
                <RelatedMovies />
            </div>
        </div>
    )
}

export default FilmPage