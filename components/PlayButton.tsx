'use client'
import React from 'react'
import { Button } from './ui/button'
import { PlayCircle } from 'lucide-react'
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
        <button className='hover:opacity-90 transition p-2' onClick={onPlay}>
            <PlayCircle className='w-12 h-12 ' />
        </button>
    )
}

export default PlayButton