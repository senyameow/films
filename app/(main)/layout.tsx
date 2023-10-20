'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import Navbar from './(routes)/_components/Navbar'
import useStoreUserEffect from '@/hooks/use-store-user'
import { api } from '@/convex/_generated/api'
import Billboard from './(routes)/_components/Billboard'

const layout = ({ children }: { children: React.ReactNode }) => {

    const film = useQuery(api.documents.getRandomFilm)

    const { isAuthenticated, isLoading } = useConvexAuth()
    const userId = useStoreUserEffect();

    if (!isAuthenticated) return redirect('/')


    if (isLoading || film === undefined || userId === null) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }


    return (
        <div className='h-full dark:bg-dark flex relative flex-1'>
            <div className='w-full fixed top-0 h-24 z-50'>
                <Navbar userId={userId} />
            </div>
            <main className='h-full flex-1 pt-24 w-full overflow-x-hidden'>
                <div className='absolute top-0 w-full h-full'>
                    <Billboard film={film} />
                </div>
                {children}
            </main>
        </div>
    )
}

export default layout