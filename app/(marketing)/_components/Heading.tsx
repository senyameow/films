'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";


const Heading = () => {

    const { isAuthenticated, isLoading } = useConvexAuth()

    return (
        <div className='max-w-3xl space-y-4 text-center flex-1'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold'>
                Films, Series, Mood, Smiles. Welcome to <span className='underline'>WTFlix</span>
            </h1>
            <h3 className='text-xl  md:text-2xl max-w-[80%] text-center mx-auto font-medium'>
                WTFlix is place where you can have a rest
                while watching the best films in the world for free!
            </h3>
            <div className='w-full flex items-center justify-center'>
                {isAuthenticated && !isLoading && <Link href={'/docs'}>
                    <Button className='font-semibold gap-2'>
                        Get WTFlix Free
                        <ArrowRight className='text-white dark:text-black font-bold w-4 h-4' />
                    </Button>
                </Link>}
                {!isAuthenticated && !isLoading && (
                    <SignInButton>
                        <Button className='font-semibold gap-2'>
                            Get WTFlix Free
                            <ArrowRight className='text-white dark:text-black font-bold w-4 h-4' />
                        </Button>
                    </SignInButton>
                )}
                {isLoading && (
                    <div>
                        <Loader2 className='animate-spin h-6 w-6' />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Heading