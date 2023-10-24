import { Star } from 'lucide-react';
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

interface StarsProps {
    stars: number;
}

const Stars = ({ stars }: StarsProps) => {
    return (
        <div className='flex items-center gap-2'>
            {Array(stars).fill(0).map(_ => (
                <AiFillStar className='w-6 h-6 text-orange-400' />
            ))}
        </div>
    )
}

export default Stars