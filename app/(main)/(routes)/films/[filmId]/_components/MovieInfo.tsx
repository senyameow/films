'use client'
import PlayButton from '@/components/PlayButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'
import { cn, formatter, secondsToFilmDuration } from '@/lib/utils'
import { Film, Loader2, Pencil, Play, Watch } from 'lucide-react'
import React from 'react'
import Rating from './Rating'
import RandomReview from './Review'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Review from './Review'
import { useMediaQuery } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import NoReview from './NoReview'

interface MovieInfoProps {
    film: Doc<'films'>
}

const MovieInfo = ({ film }: MovieInfoProps) => {

    const reviews = useQuery(api.documents.getReviews, { filmId: film._id })

    const router = useRouter()

    const isSmall = useMediaQuery('(max-width: 648px)')
    const isExtraSmall = useMediaQuery('(max-width: 468px)')

    console.log(reviews)

    if (reviews === undefined) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    return (
        <div className='col-span-7 flex flex-col items-start space-y-6 ml-8 pt-12 lg:pt-0'>
            <div className={cn(`flex items-center w-full justify-between pr-12`, isSmall && 'pr-0')}>
                <h2 className='text-3xl sm:text-4xl font-extrabold'>{film?.title}</h2>
                <Button onClick={() => { router.push(`/films/watch/${film._id}`) }} className={cn(`text-lg whitespace-nowrap `, isExtraSmall && 'rounded-full w-12 h-12 items-center justify-center p-0')}> <span className={cn(``, isExtraSmall && 'hidden')}>Watch Now</span> <Play className={cn(`w-4 h-4 ml-2`, isExtraSmall && 'w-8 h-8 ml-1')} /></Button>
            </div>
            <Separator className='dark:bg-white' />
            <div className='flex flex-row justify-between gap-6 w-full items-start h-full'>
                <div className='flex flex-col space-y-6 items-start flex-1 w-full shrink-0'>
                    <p className='text-sm shrink-0 whitespace-nowrap'> duration: <span className='text-xl lg:text-2xl font-semibold ml-4'>{secondsToFilmDuration(film?.duration)}</span></p>
                    <p className='text-sm shrink-0 whitespace-nowrap'> genre: <span className='text-xl lg:text-2xl font-semibold ml-4'>{film?.genre}</span></p>
                    <p className='text-sm shrink-0 whitespace-nowrap'> director: <span className='text-xl lg:text-2xl font-semibold ml-4'>{film?.director}</span></p>
                    <p className='text-sm shrink-0 whitespace-nowrap'> revenue: <span className='text-xl lg:text-2xl font-semibold ml-4'>{formatter.format(film?.revenue)}</span></p>
                    <p className='text-sm shrink-0 whitespace-nowrap'> year: <span className='text-xl lg:text-2xl font-semibold ml-4'>{film?.year}</span></p>
                </div>
                <div className='flex flex-col space-y-8 items-start w-full h-full flex-[1.5]'>
                    <Rating rating={film.rating!} />
                    {reviews.length > 0 && !isSmall && <Review review={reviews?.[0]!} />}
                    {reviews.length === 0 && (
                        <NoReview filmId={film._id} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieInfo