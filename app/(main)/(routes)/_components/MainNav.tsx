'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            label: 'Home',
            href: `/`,
            active: pathname === `/`
        },
        {
            label: 'Series',
            href: `/series`,
            active: pathname === `/`
        },

        {
            label: 'Films',
            href: `/films`,
            active: pathname === `/categories`
        },
        {
            label: 'Popular & New',
            href: `/billboards`,
            active: pathname === `/billboards`
        },
        {
            label: 'My List',
            href: `/products`,
            active: pathname === `/products`
        },
        {
            label: 'Reviews',
            href: `/sizes`,
            active: pathname === `/sizes`
        },
    ]

    return (
        <>
            <nav className={cn('items-center sm:gap-[25px] lg:gap-[40px] hidden sm:flex', className)}>
                {routes.map(route => (
                    <Link key={route.href} href={route.href} className={cn(`text-sm font-[400] hover:text-primary`, route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>
                        {route.label}
                    </Link>
                ))}
            </nav>
        </>
    )
}

export default MainNav