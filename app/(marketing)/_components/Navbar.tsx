'use client'
import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'

import { useConvexAuth } from "convex/react";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'


const Navbar = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const isScrolled = useScrollTop()
    return (
        <nav className={cn(`px-4 flex bg-white dark:bg-dark w-full pr-6 relative z-30`)}>
            <div className={cn(`h-full w-full flex items-center justify-between transition duration-500 border-b-black/0`, isScrolled && 'border-b-2 border-b-black/60')}>
                <Logo />
                <div className='flex items-center gap-2 h-fit'>
                    {isLoading && (
                        <Loader2 className='animate-spin' />
                    )}
                    {!isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode={'redirect'}>Log In</SignInButton>
                        </>
                    )}
                    <ModeToggle />

                    {isAuthenticated && (
                        <div className='flex items-center gap-1'>
                            <Link href={'/films'}>
                                <Button variant={'ghost'}>
                                    Enter WTFlix
                                </Button>
                            </Link>
                            <UserButton afterSignOutUrl='/' />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar