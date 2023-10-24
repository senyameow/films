'use client'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'

interface RelatedMoviesProps {
    filmGenre: string;
}

const RelatedMovies = ({ filmGenre }: RelatedMoviesProps) => {

    const relatedFilms = useQuery(api.documents.relatedMovies, { genre: filmGenre })

    return (
        <div>
            {filmGenre}
        </div>
    )
}

export default RelatedMovies