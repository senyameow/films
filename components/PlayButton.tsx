'use client'
import React from 'react'
import { Button } from './ui/button'
import { Play, PlayCircle } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface PlayButtonProps {
    id: Id<'films'>;
    className?: string;
}

const PlayButton = ({ id, className }: PlayButtonProps) => {

    const router = useRouter()

    const onPlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        router.push(`/films/watch/${id}`)
    }

    return (
        <Button className={cn(`hover:opacity-90 transition p-2`)} onClick={onPlay}>
            <Play className='w-6 h-6 ' />
            <span className={cn(`font-extrabold text-lg`, className)}>Play</span>
        </Button>
    )
}

export default PlayButton