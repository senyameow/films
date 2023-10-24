'use client'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@mantine/hooks'
import { Star } from 'lucide-react'
import React from 'react'

interface RatingProps {
    rating: number;
    className?: string;
    iconClassName?: string;
}

const Rating = ({ rating, className, iconClassName }: RatingProps) => {
    const isSmall = useMediaQuery('(max-width: 648px)')

    console.log(rating)

    return (
        <>
            {rating && <div className={cn(`flex items-center gap-4 dark:text-orange-500 pr-12`, isSmall && 'justify-end place-self-end pr-4')}>
                <Star className={cn(`w-8 h-8 font-bold `, isSmall && 'w-12 h-12', iconClassName)} />
                <span className={cn(`text-4xl sm:text-5xl lg:text-6xl`, className)}>{rating}</span>
            </div>}
        </>
    )
}

export default Rating