'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import Navbar from './_components/Navbar'
import useStoreUserEffect from '@/hooks/use-store-user'
import { userSlice } from '@/store/reducers/UsersSlice'
import { useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'

const layout = ({ children }: { children: React.ReactNode }) => {


    const { isAuthenticated, isLoading } = useConvexAuth()
    const userId = useStoreUserEffect();

    const { id } = useAppSelector(state => state.user)

    const pathname = usePathname()

    if (isLoading || userId === null || userId === undefined) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    if (!isAuthenticated) {
        console.error('Unauthenticated')
        return redirect('/')
    }

    return (
        <div className='h-full dark:bg-dark flex relative flex-1'>
            {!pathname.includes('watch') && < div className='w-full fixed top-0 h-24 z-50'>
                <Navbar userId={userId} />
            </div>}
            <main className={cn(`h-full flex-1 pt-24 w-full overflow-x-hidden`, pathname.includes('watch') && 'pt-0')}>
                {children}
            </main>
        </div >
    )
}

export default layout