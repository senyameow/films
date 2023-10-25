'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { createReviewSlice } from '@/store/reducers/CreateReviewSlice'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { AiFillStar } from 'react-icons/ai'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'


const CreateReview = () => {

    const { isOpen, userId, film } = useAppSelector(state => state.create)
    const dispatch = useAppDispatch()
    const { onClose } = createReviewSlice.actions
    const createReview = useMutation(api.documents.createReview)

    console.log(isOpen)

    const [stars, setStars] = useState<1 | 2 | 3 | 4 | 5 | null>(null)

    const onCreate = async (star: 1 | 2 | 3 | 4 | 5) => {
        const res = await createReview({
            userId: userId!,
            filmId: film?._id!,
            stars: star
        })
    }
    console.log(stars)

    const onStar = (star: 1 | 2 | 3 | 4 | 5) => {
        console.log(stars)
        setStars(star)
        if (star === stars) {
            setStars(null)
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(onClose())}>
            <DialogContent className='rounded-t-xl pb-4 min-w-[600px] px-6 py-4'>
                <DialogHeader className='w-full'>
                    <div>
                        What do You think about {film?.title} ?
                    </div>
                </DialogHeader>
                <div className='flex items-center gap-2 w-fit'>
                    <button onClick={() => onStar(1)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== null && stars >= 1 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(2)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== null && stars >= 2 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(3)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== null && stars >= 3 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(4)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== null && stars >= 4 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(5)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== null && stars === 5 && 'text-orange-400')} /></button>
                </div>
                <ScrollArea className='w-full h-full'>
                    <Textarea />
                </ScrollArea>
            </DialogContent>

        </Dialog>
    )
}

export default CreateReview