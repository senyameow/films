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

interface RandomReviewProps {
    review: Doc<'reviews'>
}

const RandomReview = ({ review }: RandomReviewProps) => {

    const user = useQuery(api.documents.getUser, { id: review.userId })

    return (
        <Card className='bg-transparent p-0 w-full'>
            <CardHeader>
                <CardTitle className='pb-2'>{user?.name}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className='px-2'>
                <ScrollArea className='h-[140px] w-full'>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default RandomReview