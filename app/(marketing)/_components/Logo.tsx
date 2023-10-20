import React from 'react'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
    weight: ['400', '600'],
    subsets: ['latin']
})

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
    return (
        <div className={`hidden md:flex items-center gap-2`}>
            <p className={cn(`font-semibold`, font.className, className)}>WTFLIX</p>
        </div>
    )
}

export default Logo