'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Logo from '@/app/(marketing)/_components/Logo'


const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname()

    const routes = [

        {
            label: 'Series',
            href: `/series`,
            active: pathname === `/series`
        },

        {
            label: 'Films',
            href: `/films`,
            active: pathname === `/films`
        },
        {
            label: 'Popular & New',
            href: `/popular`,
            active: pathname === `/popular`
        },
        {
            label: 'My List',
            href: `/list`,
            active: pathname === `/list`
        },
        {
            label: 'Reviews',
            href: `/reviews`,
            active: pathname === `/reviews`
        },
    ]

    return (
        <>
            <nav className={cn('items-center sm:gap-[15px] lg:gap-[40px] hidden sm:flex', className)}>
                {routes.map(route => (
                    <Link key={route.href} href={route.href} className={cn(`lg:text-sm sm:text-[13px] font-[400] hover:text-primary`, route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>
                        {route.label}
                    </Link>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger><Menu className='w-5 h-5 sm:hidden block' /></SheetTrigger>
                <SheetContent side={'left'} className='w-[300px] p-0 py-4'>
                    <SheetHeader>
                        <SheetTitle><Link href='/films'><Logo className='text-2xl' />WTFlix</Link></SheetTitle>
                        <SheetDescription>

                        </SheetDescription>
                    </SheetHeader>
                    <div className='flex items-start flex-col gap-2'>
                        {routes.map(route => (
                            <Link key={route.href} href={route.href} className={cn(`text-sm font-[400] hover:text-primary w-full p-6 hover:bg-black/90`, route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default MainNav