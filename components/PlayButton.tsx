'use client'
import React from 'react'
import { Button } from './ui/button'
import { Play, PlayCircle } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import { Id } from '@/convex/_generated/dataModel'

interface PlayButtonProps {
    id: Id<'films'>
}

const PlayButton = ({ id }: PlayButtonProps) => {

    const dispatch = useAppDispatch()

    const onPlay = () => {
        console.log(id)
    }

    return (
        <Button className='hover:opacity-90 transition p-2' onClick={onPlay}>
            <Play className='w-6 h-6 ' />
            <span className='font-extrabold text-lg'>Play</span>
        </Button>
    )
}

export default PlayButton