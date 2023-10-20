import React from 'react'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
    weight: ['400', '600'],
    subsets: ['latin']
})

const Logo = () => {
    return (
        <div className={`hidden md:flex items-center gap-2`}>
            <p className={cn(`font-semibold`, font.className)}>WTFLIX</p>
        </div>
    )
}

export default Logo