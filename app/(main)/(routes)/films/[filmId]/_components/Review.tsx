'use client'
import React, { useRef, useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Doc } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import Image from 'next/image'
import Rating from './Rating'
import Stars from './Stars'
import { Button } from '@/components/ui/button'
import { Edit, Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { Textarea } from '@/components/ui/textarea'
import ReviewStateSlice, { reviewSlice } from '@/store/reducers/ReviewStateSlice'

interface ReviewProps {
    review: Doc<'reviews'>
}

const Review = ({ review }: ReviewProps) => {

    const reviewer = useQuery(api.documents.getUser, { id: review.userId })


    const { user } = useUser()
    const [content, setContent] = useState(review.content || '')
    const changeReview = useMutation(api.documents.changeReview)
    const { editing } = useAppSelector(state => state.review)

    const dispatch = useAppDispatch()
    const { onEdit, onClose } = reviewSlice.actions

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const userDB = useQuery(api.documents.getUserByEmail, { email: user?.emailAddresses[0].emailAddress! })

    const isOwn = userDB?._id === review.userId

    // if (userDB?._id === undefined) {
    //     return (
    //         <div className='flex h-full w-full items-center justify-center'>
    //             <Loader2 className='w-12 h-12 animate-spin' />
    //         </div>
    //     )
    // }

    const onSave = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            dispatch(onClose())
            changeReview({
                content,
                id: review._id
            })
        }
    }


    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
        changeReview({
            content,
            id: review._id
        })
    }

    const enableInput = () => {
        setContent(review.content!)
        dispatch(onEdit())
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0);
    }

    const onBlur = () => {
        dispatch(onClose())
        changeReview({
            content,
            id: review._id
        })
    }

    return (
        <Card className='bg-transparent p-0 w-full group relative min-w-fit'>
            {isOwn && (
                <Button onClick={enableInput} variant={'ghost'} className='absolute -top-3 opacity-0 group-hover:opacity-100 transition right-2'>
                    <Edit className='w-4 h-4' />
                </Button>
            )}
            <CardHeader>
                <CardTitle className='flex items-center gap-3 justify-between w-full'>
                    <div className='flex items-center gap-3 shrink-0'>
                        <Image className='rounded-full shrink-0' width={30} height={30} alt='user avatar' src={reviewer?.image_url!} />
                        <div className='whitespace-nowrap shrink-0 flex-1 min-w-fit'>{reviewer?.name}</div>
                    </div>
                    <Stars stars={review.stars} />
                </CardTitle>
            </CardHeader>
            <CardContent className='px-2'>
                {review.content && !editing && < ScrollArea className='h-[140px] w-full px-4'>
                    <div className='w-full max-h-full text-sm'>
                        {review.content}
                    </div>
                </ScrollArea>}
                {editing && (
                    < ScrollArea className='h-[140px] w-full px-4'>
                        <div className='w-full max-h-full text-sm'>
                            <Textarea onBlur={onBlur} value={content || review.content} onKeyDown={onSave} onChange={onChangeContent} ref={inputRef} className='resize-none text-lg w-full h-full font-bold bg-transparent py-0 focus-visible:border-none focus-within:ring-0 focus-within:ring-offset-0 outline-none focus-visible:right-0 ring-0 focus-visible:ring-offset-0 ring-offset-0 border-none focus-visible:border-0 focus-visible:ring-0 scrollbar scrollbar-thumb-gray-500' />
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card >
    )
}

export default Review