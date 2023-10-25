'use client'
import React from 'react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Doc } from '@/convex/_generated/dataModel'
import { Heart } from 'lucide-react'
import { AiFillHeart } from 'react-icons/ai'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import FavoriteCard from './FavoriteCard'

interface FavoritesProps {
    favorites: Doc<'films'>[]
}

const Favorites = ({ favorites }: FavoritesProps) => {
    return (
        <Popover>
            <PopoverTrigger className='relative'>
                <AiFillHeart className='w-7 h-7 hover:text-red-500 transition' role='button' />
                <div className='w-5 h-5 flex items-center justify-center rounded-full absolute bg-rose-400 text-sm -top-2 -right-2' >{favorites.length}</div>
            </PopoverTrigger>
            <PopoverContent className="w-80 min-h-[200px]">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className={cn(`font-medium leading-none`, favorites.length === 0 && 'mb-8')}>Your favorite movies</h4>
                        {favorites.length === 0 ? (
                            <div className='w-full h-full flex items-center justify-center text-lg text-muted-foreground'>
                                Nothing here yet..
                            </div>
                        ) : (<ScrollArea className='h-[200px]'>
                            {favorites.map(film => (
                                <FavoriteCard film={film} key={film._id} />
                            ))}
                        </ScrollArea>)}

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Favorites