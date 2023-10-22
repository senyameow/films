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
import { secondsToFilmDuration } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const MoreInfoModal = () => {

    const { isOpen, film, user } = useAppSelector(state => state.more)
    const dispatch = useAppDispatch()
    const { onClose } = moreInfoSlice.actions

    if (film === undefined) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(onClose())}>
            <DialogContent className='rounded-t-xl pb-4'>
                <DialogHeader className='w-full'>
                    <div className="relative h-96 w-full">
                        <video poster={film?.cover_url} autoPlay muted loop src={film?.video_url} className="w-full rounded-t-xl brightness-[60%] object-cover h-full" />
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                {film?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton id={film._id} />
                                {user?._id === undefined ? <Loader2 className='w-4 h-4 animate-spin' /> : <FavoriteButton id={film._id} userId={user?._id} />}
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <div className='max-w-full h-[200px] px-8 py-4'>
                    <div className='flex items-start flex-col gap-3 overflow-y-auto h-full'>
                        <div className='flex items-center gap-3 w-full justify-between'>
                            <div className='flex items-center gap-3'>
                                <span className='text-green-400 text-lg font-semibold'>New</span>
                                <span>{film.genre}</span>
                            </div>
                            <div className='mr-4 text-xl font-bold'>
                                {secondsToFilmDuration(film.duration)}
                            </div>
                        </div>
                        <div className='h-full w-[700px] overflow-x-hidden rounded-md p-2 overflow-y-auto scrollbar scrollbar-thumb-gray-400'>
                            {film?.description}
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default MoreInfoModal
