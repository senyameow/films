import { Star } from 'lucide-react'
import React from 'react'

interface RatingProps {
    rating: number
}

const Rating = ({ rating }: RatingProps) => {
    return (
        <div className='flex items-center gap-4 pr-12 dark:text-orange-500'>
            <Star className='w-8 h-8 font-bold ' />
            <span className='text-3xl sm:text-4xl lg:text-5xl'>{rating}</span>
        </div>
    )
}

export default Rating