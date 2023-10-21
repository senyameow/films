'use client'
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useIntersection } from '@mantine/hooks';
import { usePaginatedQuery } from 'convex/react';
import React, { useEffect, useRef } from 'react'

const MovieList = () => {

    const { user } = useUser()

    const { results, status, loadMore } = usePaginatedQuery(
        api.documents.movieList,
        {},
        { initialNumItems: 8 }
    );

    const lastRowRef = useRef<HTMLElement>(null)

    const { ref, entry } = useIntersection({
        root: lastRowRef.current,
        threshold: 1
    })

    useEffect(() => {
        if (entry?.isIntersecting) loadMore(4)
    }, [entry])

    return (
        <div className='px-4 md:px-12 min-h-full pt-36 md:pt-0 bg-dark pb-24'>
            <h1 className='text-3xl font-semibold py-12'>Best here for you <span className='text-4xl font-bold ml-2'>{user?.firstName}</span>:</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {results?.map((film, ind) => {
                    if (ind === results.length) {
                        return (
                            <div key={film._id} ref={ref} className='text-7xl'>
                                {film?.title}
                            </div>
                        )
                    }
                    return (
                        <div ref={ref} key={film._id} className='w-full h-full min-w-[300px] mx-auto relative'>
                            <img src={film.cover_url} alt="film" className='object-cover h-full w-full' />
                        </div>
                    )
                })}
                {status === 'LoadingMore' && (
                    <Skeleton className='w-[330px] h-[200px] text-gray-400' />
                )}
            </div>
        </div>
    )
}

export default MovieList