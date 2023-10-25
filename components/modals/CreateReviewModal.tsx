'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { createReviewSlice } from '@/store/reducers/CreateReviewSlice'


const CreateReview = () => {

    const { isOpen, userId, film } = useAppSelector(state => state.create)
    const dispatch = useAppDispatch()
    const { onClose } = createReviewSlice.actions

    console.log(isOpen)

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(onClose())}>
            <DialogContent className='rounded-t-xl pb-4'>
                <DialogHeader className='w-full'>
                    Don't hold your emotions back
                </DialogHeader>
                <DialogDescription>
                    qweqwe
                </DialogDescription>

                <div className=''>
                    We need your opinion
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CreateReview