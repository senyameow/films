'use client'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import React from 'react'
import Gallery from './_components/Gallery'
import MovieInfo from './_components/MovieInfo'
import RelatedMovies from '../_components/RelatedMovies'


const FilmPage = () => {

    const params = useParams()

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='px-4 py-10 sm:px-6 lg:px-8'>
                <div className='lg:grid lg:grid-cols-2 lg:items-start gap-6 justify-between'>
                    <Gallery />
                    <MovieInfo />
                </div>
                <Separator className='my-10' />
                <RelatedMovies />
            </div>
        </div>
    )
}

export default FilmPage