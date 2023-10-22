'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useStoreUserEffect from '@/hooks/use-store-user'
import { useUser } from '@clerk/clerk-react'
import { useMutation, useQuery } from 'convex/react'
import { Loader2, PlusCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

interface FavoriteButtonProps {
    id: Id<'films'>
    userId: Id<'users'>
}

const FavoriteButton = ({ id, userId }: FavoriteButtonProps) => {

    const addToFavourites = useMutation(api.documents.addFilm)
    const removeFromFavourites = useMutation(api.documents.removeFilm)


    const user = useQuery(api.documents.getUser, { id: userId })

    const isAlreadyIn = user?.favouriteIds?.includes(id)

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
    const onRemove = async () => {
        try {
            const res = await removeFromFavourites({ id, userId: userId! })
            console.log(res)
            toast.success(`you have successfully added removed from your favourites`)
        } catch (error) {
            toast.error('something went wrong')
            console.log(error)
        }
    }

    return (
        <>
            {isAlreadyIn ? (
                <button disabled={userId === null} className='hover:opacity-90 transition p-2' onClick={onRemove}>
                    {userId === null ? <Loader2 className='w-8 h-8 animate-spin' /> : <X className='w-8 h-8 ' />}
                </button>
            ) : <button disabled={userId === null} className='hover:opacity-90 transition p-2' onClick={onAdd}>
                {userId === null ? <Loader2 className='w-8 h-8 animate-spin' /> : <PlusCircle className='w-8 h-8 ' />}
            </button>}
        </>
    )
}

export default FavoriteButton