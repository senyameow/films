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
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const CreateReview = () => {

    const { isOpen, userId, film } = useAppSelector(state => state.create)
    const dispatch = useAppDispatch()
    const { onClose } = createReviewSlice.actions
    const createReview = useMutation(api.documents.createReview)
    const [content, setContent] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [stars, setStars] = useState<1 | 2 | 3 | 4 | 5 | undefined>(undefined)

    const onCreate = async () => {
        setIsLoading(true)
        try {
            await createReview({
                userId: userId!,
                filmId: film?._id!,
                stars,
                content
            })
            toast.success(`thanks`)
        } catch (error) {
            toast.error('something went wrong')
        } finally {
            dispatch(onClose())
            setIsLoading(false)
        }
    }

    const onStar = (star: 1 | 2 | 3 | 4 | 5) => {
        console.log(stars)
        setStars(star)
        if (star === stars) {
            setStars(undefined)
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
                    <button onClick={() => onStar(1)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== undefined && stars >= 1 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(2)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== undefined && stars >= 2 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(3)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== undefined && stars >= 3 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(4)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== undefined && stars >= 4 && 'text-orange-400')} /></button>
                    <button onClick={() => onStar(5)}><AiFillStar className={cn(`w-8 h-8 text-xl hover:block hover:text-orange-400`, stars !== undefined && stars === 5 && 'text-orange-400')} /></button>
                </div>
                <ScrollArea className='w-full h-[300px]'>
                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} className='resize-none text-lg w-full h-[300px] font-bold bg-transparent py-3 focus-within:ring-0 focus-within:ring-offset-0 outline-none focus-visible:right-0 ring-0 focus-visible:ring-offset-0 ring-offset-0 focus-visible:ring-0 scrollbar  scrollbar-thumb-gray-500 border dark:border-white border-neutral-400' />
                </ScrollArea>
                <div className='flex items-center justify-between w-full'>
                    <Button variant={'outline'}>Cancel</Button>
                    <Button disabled={!stars || isLoading} onClick={onCreate}>
                        {isLoading && <Loader2 className='w-4 h-4 mr-2' />}
                        Submit
                    </Button>
                </div>
            </DialogContent>

        </Dialog>
    )
}

export default CreateReview