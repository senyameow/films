'use client'
import PlayButton from '@/components/PlayButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'
import { formatter, secondsToFilmDuration } from '@/lib/utils'
import { Film, Play, Watch } from 'lucide-react'
import React from 'react'
import Rating from './Rating'

interface MovieInfoProps {
    film: Doc<'films'>
}

const MovieInfo = ({ film }: MovieInfoProps) => {
    return (
        <div className='col-span-7 flex flex-col items-start space-y-6 ml-8'>
            <div className='flex items-center w-full justify-between'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold'>{film?.title}</h2>
                <Button className='text-lg'>Whatch Now <Play className='w-4 h-4 ml-2' /></Button>
            </div>
            <Separator className='dark:bg-white' />
            <div className='flex flex-row justify-between gap-3 w-full items-start'>
                <div className='flex flex-col space-y-6 items-start'>
                    <p className='text-sm'> duration: <span className='text-xl lg:text-2xl font-semibold ml-4'>{secondsToFilmDuration(film?.duration)}</span></p>
                    <p className='text-sm'> genre: <span className='text-xl lg:text-2xl font-semibold ml-4'>{film?.genre}</span></p>
                    <p className='text-sm'> director: <span className='text-xl lg:text-2xl font-semibold ml-4'>{film?.director}</span></p>
                    <p className='text-sm'> revenue: <span className='text-xl lg:text-2xl font-semibold ml-4'>{formatter.format(film?.revenue)}</span></p>
                    <p className='text-sm'> year: <span className='text-xl lg:text-2xl font-semibold ml-4'>{film?.year}</span></p>
                </div>
                <Rating rating={film.rating!} />
            </div>
        </div>
    )
}

export default MovieInfo