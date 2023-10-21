'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import MoreInfoSlice, { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const MoreInfoModal = () => {

    const dispatch = useAppDispatch()
    const { onClose } = moreInfoSlice.actions
    const { isOpen, filmId } = useAppSelector(state => state.more)

    if (!filmId) return null

    const movie = useQuery(api.documents.movie, { id: filmId! })

    if (movie === null) return null

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(onClose())}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{movie?.title}</DialogTitle>
                    <DialogDescription>
                        {movie?.description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default MoreInfoModal