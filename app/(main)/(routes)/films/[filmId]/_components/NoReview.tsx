'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import useStoreUserEffect from '@/hooks/use-store-user'
import { reviewSlice } from '@/store/reducers/ReviewStateSlice'
import { useUser } from '@clerk/clerk-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useMutation, useQuery } from 'convex/react'
import { Loader, Loader2, Pencil, Star } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

interface NoReviewProps {
    filmId: Id<'films'>
}

const NoReview = ({ filmId }: NoReviewProps) => {

    const dispatch = useAppDispatch()
    // const { id } = useAppSelector(state => state.user)
    const { editing } = useAppSelector(state => state.review)
    const { onEdit, onClose } = reviewSlice.actions

    const { user } = useUser()
    console.log(user)
    const userDB = useQuery(api.documents.getUserByEmail, { email: user?.emailAddresses[0].emailAddress! })


    const createReview = useMutation(api.documents.createReview)
    const [editingLocal, setEditingLocal] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)


    if (userDB?._id === undefined) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin' />
            </div>
        )
    }

    const onCreate = async (star: 1 | 2 | 3 | 4 | 5) => {
        const res = await createReview({
            userId: userDB._id,
            filmId,
            stars: star
        })
        setEditingLocal(true)
        dispatch(onEdit())
    }



    return (
        <div className='w-full flex items-center flex-col justify-center gap-8 '>
            <div className='h-full w-full flex items-center justify-center pt-12 text-2xl font-bold'>
                No reviews yet, be first!
            </div>
            {editing || editingLocal ? (
                <Card className='bg-transparent p-0 w-full group relative min-w-fit h-full'>
                    <CardContent className='px-2'>
                        <ScrollArea className='h-[140px] max-w-full p-4'>
                            <Textarea onBlur={() => setEditingLocal(false)} value={''} onKeyDown={() => { }} onChange={() => { }} ref={inputRef} className='resize-none text-lg w-full h-full font-bold bg-transparent py-0 focus-visible:border-none focus-within:ring-0 focus-within:ring-offset-0 outline-none focus-visible:right-0 ring-0 focus-visible:ring-offset-0 ring-offset-0 border-none focus-visible:border-0 focus-visible:ring-0 scrollbar scrollbar-thumb-gray-500' />
                        </ScrollArea>
                    </CardContent>
                </Card>
            ) : (
                <div className='flex items-center gap-2 w-fit'>
                    <button onClick={() => onCreate(1)}><AiFillStar className={`w-8 h-8 text-xl hover:block hover:text-orange-400`} /></button>
                    <button onClick={() => onCreate(2)}><AiFillStar className={`w-8 h-8 text-xl hover:block hover:text-orange-400`} /></button>
                    <button onClick={() => onCreate(3)}><AiFillStar className={`w-8 h-8 text-xl hover:block hover:text-orange-400`} /></button>
                    <button onClick={() => onCreate(4)}><AiFillStar className={`w-8 h-8 text-xl hover:block hover:text-orange-400`} /></button>
                    <button onClick={() => onCreate(5)}><AiFillStar className={`w-8 h-8 text-xl hover:block hover:text-orange-400`} /></button>
                </div>
            )}

        </div>
    )
}

export default NoReview