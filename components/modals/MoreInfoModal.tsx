import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import React, { useEffect } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from '../ui/scroll-area'
import PlayButton from '../PlayButton'
import FavoriteButton from '../FavoriteButton'

const MoreInfoModal = () => {

    const { isOpen, film } = useAppSelector(state => state.more)
    const dispatch = useAppDispatch()
    const { onClose } = moreInfoSlice.actions

    if (film === undefined) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(onClose())}>
            <DialogContent className='rounded-t-xl'>
                <DialogHeader className='w-full'>
                    <div className="relative h-96 w-full">
                        <video poster={film?.cover_url} autoPlay muted loop src={film?.video_url} className="w-full rounded-t-xl brightness-[60%] object-cover h-full" />
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                {film?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton id={film._id} />
                                <FavoriteButton id={film._id} />
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <ScrollArea className='w-full h-[200px] px-5 pt-2'>
                    {film?.description}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default MoreInfoModal
