'use client'
import Logo from '@/app/(marketing)/_components/Logo'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import React, { useId } from 'react'
import MainNav from './MainNav'
import { UserButton, useUser } from '@clerk/clerk-react'
import Notifications from './Notifications'
import Search from './Search'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import useStoreUserEffect from '@/hooks/use-store-user'
import Link from 'next/link'

interface NavbarProps {
    userId: Id<'users'>
}

const Navbar = ({ userId }: NavbarProps) => {

    const user = useQuery(api.documents.getUser, { id: userId })

    const isScrolled = useScrollTop()

    return (
        <div className={cn(`flex w-full px-12 py-2 bg-neutral-700 h-full items-center transition`, isScrolled && 'opacity-10')}>
            < div className='flex flex-row items-center gap-3' >
                <Link href='/films'><Logo className='text-2xl mr-8' /></Link>
                <MainNav />
            </div >
            <div className=' ml-auto flex items-center gap-4'>
                <Search />
                <Notifications />
                <UserButton afterSignOutUrl='/' />
                {user === undefined ? <Loader2 className='w-4 h-4 animate-spin' /> : <div>{user?.name}</div>}
            </div>
        </div >
    )
}

export default Navbar