'use client'
import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

interface FavoriteCardProps {
    film: Doc<'films'>
}

const FavoriteCard = ({ film }: FavoriteCardProps) => {
    return (
        <div className='w-full px-2'>
            {film.title}
        </div>
    )
}

export default FavoriteCard