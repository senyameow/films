'use client'
import Logo from '@/app/(marketing)/_components/Logo'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import React from 'react'
import MainNav from './MainNav'
import { UserButton } from '@clerk/clerk-react'
import Notifications from './Notifications'
import Search from './Search'

const Navbar = () => {

    const isScrolled = useScrollTop()

    return (
        <div className={cn(`flex w-full px-12 py-2 bg-neutral-700 h-full items-center transition`, isScrolled && 'bg-zinc-900 bg-opacity-90')}>
            <div className='flex flex-row items-center gap-3'>
                <Logo className='text-2xl mr-8' />
                <MainNav />
            </div>
            <div className=' ml-auto flex items-center gap-4'>
                <Search />
                <Notifications />
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar