'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import Navbar from './(routes)/_components/Navbar'
import useStoreUserEffect from '@/hooks/use-store-user'
import { api } from '@/convex/_generated/api'

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

    const userId = useStoreUserEffect();

    if (userId === null) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    return (
        <div className='h-full dark:bg-dark flex relative flex-1'>
            <div className='w-full fixed top-0 h-24 bg-white'>
                <Navbar userId={userId} />
            </div>
            <main className='h-full flex-1 pt-24 '>
                {children}
            </main>
        </div>
    )
}

export default layout