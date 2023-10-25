'use client'
import { Doc, Id } from '@/convex/_generated/dataModel'
import React from 'react'
import Review from './Review';
import { useMediaQuery } from '@mantine/hooks';
import NoReview from './NoReview';
import { Button } from '@/components/ui/button';
import { Edit, Loader2, Pencil } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAppDispatch } from '@/hooks/redux';
import { createReviewSlice } from '@/store/reducers/CreateReviewSlice';

interface ReviewListProps {
    reviews: Doc<'reviews'>[];
    film: Doc<'films'>
}

const ReviewList = ({ reviews, film }: ReviewListProps) => {

    const { user } = useUser()
    const userDB = useQuery(api.documents.getUserByEmail, { email: user?.emailAddresses[0].emailAddress! })

    const dispatch = useAppDispatch()
    const { onOpen } = createReviewSlice.actions

    if (userDB?._id === undefined) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    const isAlready = !!reviews.find(review => review.userId === userDB?._id)

    return (
        <div>
            <div className='w-full flex items-center justify-between gap-3'>
                <h2 className='pb-6 text-xl sm:text-2xl xl:text-3xl font-bold'>What other people say</h2>
                {!isAlready && <Button onClick={() => { dispatch(onOpen({ film, userId: userDB._id })) }}>Add Review<Pencil className='w-4 h-4 ml-2' /></Button>}
            </div>
            {reviews.length === 0 ? <NoReview filmId={film._id} /> : <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                {reviews?.map(review => (
                    <Review key={review._id} review={review} />
                ))}
            </div>}
        </div>
    )
}

export default ReviewList