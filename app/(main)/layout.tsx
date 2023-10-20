'use client'

import React from 'react'
import { useConvexAuth } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import Navbar from './(routes)/_components/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, isLoading } = useConvexAuth()

    if (isLoading) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    if (!isAuthenticated) return redirect('/')

    return (
        <div className='h-full dark:bg-dark flex relative flex-1'>
            <div className='w-full absolute top-0 h-24 bg-white'>
                <Navbar />
            </div>
            <main className='h-full flex-1 pt-24 '>
                {children}
            </main>
        </div>
    )
}

export default layout