'use client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import React from 'react'

const NoReview = () => {
    return (
        <div className='w-full flex items-center flex-col justify-center gap-8 '>
            <div className='h-full w-full flex items-center justify-center pt-12 text-2xl font-bold'>
                No reviews yet, be first!
            </div>
            <Button><Pencil /></Button>
        </div>
    )
}

export default NoReview