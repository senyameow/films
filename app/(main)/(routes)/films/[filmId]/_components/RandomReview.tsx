'use client'
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area'

const RandomReview = () => {
    return (
        <Card className='bg-transparent p-0 w-full'>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
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