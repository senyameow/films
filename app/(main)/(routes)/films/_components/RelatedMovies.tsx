'use client'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'
import Movie from './Movie';
import { Id } from '@/convex/_generated/dataModel';

interface RelatedMoviesProps {
    filmGenre: string;
    userId: Id<'users'>;
}

const RelatedMovies = ({ filmGenre, userId }: RelatedMoviesProps) => {

    const relatedFilms = useQuery(api.documents.relatedMovies, { genre: filmGenre })

    return (
        <div>
            <h2 className='pb-6 text-xl sm:text-2xl xl:text-3xl font-bold'>You may also like</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {relatedFilms?.map(film => (
                    <Movie userId={userId} key={film._id} film={film} />
                ))}
            </div>
        </div>
    )
}

export default RelatedMovies