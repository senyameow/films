'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import useStoreUserEffect from '@/hooks/use-store-user'
import { useUser } from '@clerk/clerk-react'
import { useMutation, useQuery } from 'convex/react'
import { Loader2, PlusCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface FavoriteButtonProps {
    id: Id<'films'>
    userId: Id<'users'>
}

const FavoriteButton = ({ id, userId }: FavoriteButtonProps) => {

    const addToFavourites = useMutation(api.documents.addFilm)
    const removeFromFavourites = useMutation(api.documents.removeFilm)

    const [isAdding, setIsAdding] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    const user = useQuery(api.documents.getUser, { id: userId })
    const film = useQuery(api.documents.movie, { id })


    const isAlreadyIn = user?.favouriteIds?.includes(id)

    const onAdd = async () => {
        try {
            setIsAdding(true)
            await addToFavourites({ id, userId: userId! })
            toast.success(`you have successfully added ${film?.title} to your favourites`)
        } catch (error) {
            toast.error('something went wrong')
            console.log(error)
        } finally {
            setIsAdding(false)
        }
    }
    const onRemove = async () => {
        try {
            setIsRemoving(true)
            await removeFromFavourites({ id, userId: userId! })
            toast.success(`you have successfully removed ${film?.title} from your favourites`)
        } catch (error) {
            toast.error('something went wrong')
            console.log(error)
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <>
            {isAlreadyIn ? (
                <button disabled={isRemoving} className='hover:opacity-90 transition p-2' onClick={onRemove}>
                    {isRemoving ? <Loader2 className='w-8 h-8 animate-spin' /> : <X className='w-8 h-8 ' />}
                </button>
            ) : <button disabled={isAdding} className='hover:opacity-90 transition p-2' onClick={onAdd}>
                {isAdding ? <Loader2 className='w-8 h-8 animate-spin' /> : <PlusCircle className='w-8 h-8 ' />}
            </button>}
        </>
    )
}

export default FavoriteButton