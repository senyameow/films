'use client'
import React, { useState } from 'react'

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
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import Image from 'next/image'
import Rating from './Rating'
import Stars from './Stars'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useAppSelector } from '@/hooks/redux'

interface ReviewProps {
    review: Doc<'reviews'>
}

const Review = ({ review }: ReviewProps) => {

    const user = useQuery(api.documents.getUser, { id: review.userId })

    const { id } = useAppSelector(state => state.user)

    const isOwn = id === review.userId

    return (
        <Card className='bg-transparent p-0 w-full group relative min-w-fit'>
            {isOwn && (
                <Button variant={'ghost'} className='absolute -top-3 opacity-0 group-hover:opacity-100 transition right-2'>
                    <Edit className='w-4 h-4' />
                </Button>
            )}
            <CardHeader>
                <CardTitle className='flex items-center gap-3 justify-between w-full'>
                    <div className='flex items-center gap-3 shrink-0'>
                        <Image className='rounded-full shrink-0' width={30} height={30} alt='user avatar' src={user?.image_url!} />
                        <div className='whitespace-nowrap shrink-0 flex-1 min-w-fit'>{user?.name}</div>
                    </div>
                    <Stars stars={review.stars} />
                </CardTitle>
            </CardHeader>
            <CardContent className='px-2'>
                <ScrollArea className='h-[140px] w-full px-4'>
                    <div className='w-full max-h-full text-sm'>
                        {review.content}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default Review