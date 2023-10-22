'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useStoreUserEffect from '@/hooks/use-store-user'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { Loader2, PlusCircle } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface FavoriteButtonProps {
    id: Id<'films'>
}

const FavoriteButton = ({ id }: FavoriteButtonProps) => {

    const addToFavourites = useMutation(api.documents.addFilm)

    const userId = useStoreUserEffect()

    const onAdd = async () => {
        try {
            const res = await addToFavourites({ id, userId: userId! })
            console.log(res)
            toast.success(`you have successfully added film to your favourites`)
        } catch (error) {
            toast.error('something went wrong')
            console.log(error)
        }
    }

    return (
        <button disabled={userId === null} className='hover:opacity-90 transition p-2' onClick={onAdd}>
            {userId === null ? <Loader2 className='w-8 h-8 animate-spin' /> : <PlusCircle className='w-8 h-8 ' />}
        </button>
    )
}

export default FavoriteButton