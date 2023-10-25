'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { useAppDispatch } from '@/hooks/redux'
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice'
import { useMutation } from 'convex/react'
import { Info, Loader2, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface FavoriteCardProps {
    film: Doc<'films'>;
    userId: Id<'users'>
}

const FavoriteCard = ({ film, userId }: FavoriteCardProps) => {

    const [isRemoving, setIsRemoving] = useState(false)

    const removeFromFavourites = useMutation(api.documents.removeFilm)

    const router = useRouter()

    const dispatch = useAppDispatch()
    const { onOpen } = moreInfoSlice.actions

    const onInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(onOpen({ userId, film }))
    }

    const onRemove = async () => {
        try {
            setIsRemoving(true)
            await removeFromFavourites({ id: film._id, userId: userId! })
            toast.success(`you have successfully removed ${film?.title} from your favourites`)
        } catch (error) {
            toast.error('something went wrong')
            console.log(error)
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <div role='button' onClick={() => { router.push(`/films/${film._id}`) }} className='w-full border group relative'>
            <div className='flex items-center gap-2'>
                <Image src={film.cover_url} alt='cover' width={90} height={30} className='object-cover' />
                <span className='text-md font-bold'>{film.title}</span>
            </div>
            <div className='flex items-center gap-3 opacity-0 group-hover:opacity-100 transition absolute top-[14px] right-2'>
                <button disabled={isRemoving} onClick={onRemove}>
                    {isRemoving ? <Loader2 className='w-4 h-4 animate-spin' /> : <Trash className='w-4 h-4' />}
                </button>
                <button onClick={onInfo} ><Info className='w-4 h-4' /></button>
            </div>
        </div>
    )
}

export default FavoriteCard