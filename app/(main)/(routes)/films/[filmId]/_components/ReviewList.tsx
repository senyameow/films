import { Doc, Id } from '@/convex/_generated/dataModel'
import React from 'react'
import Review from './Review';
import { useMediaQuery } from '@mantine/hooks';
import NoReview from './NoReview';

interface ReviewListProps {
    reviews: Doc<'reviews'>[];
    filmId: Id<'films'>
}

const ReviewList = ({ reviews, filmId }: ReviewListProps) => {

    return (
        <div>
            <h2 className='pb-6 text-xl sm:text-2xl xl:text-3xl font-bold'>What other people say</h2>
            {reviews.length === 0 ? <NoReview filmId={filmId} /> : <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {reviews?.map(review => (
                    <Review key={review._id} review={review} />
                ))}
            </div>}
        </div>
    )
}

export default ReviewList