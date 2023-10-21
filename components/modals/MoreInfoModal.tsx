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
    const { onClose, onOpen } = moreInfoSlice.actions
    const { isOpen, filmId } = useAppSelector(state => state.more)

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(onClose())}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default MoreInfoModal