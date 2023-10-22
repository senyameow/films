'use client'
import { Id } from '@/convex/_generated/dataModel'
import { PlusCircle } from 'lucide-react'
import React from 'react'

interface FavoriteButtonProps {
    id: Id<'films'>
}

const FavoriteButton = ({ id }: FavoriteButtonProps) => {

    const onAdd = () => {

    }

    return (
        <button className='hover:opacity-90 transition p-2' onClick={onAdd}>
            <PlusCircle className='w-8 h-8 ' />
        </button>
    )
}

export default FavoriteButton