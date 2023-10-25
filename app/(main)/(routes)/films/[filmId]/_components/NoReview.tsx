'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { reviewSlice } from '@/store/reducers/ReviewStateSlice'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useMutation } from 'convex/react'
import { Pencil } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface NoReviewProps {
    filmId: Id<'films'>
}

const NoReview = ({ filmId }: NoReviewProps) => {

    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.user)
    const { editing } = useAppSelector(state => state.review)
    const { onEdit, onClose } = reviewSlice.actions

    const [content, setContent] = useState('')

    const createReview = useMutation(api.documents.createReview)
    const changeReview = useMutation(api.documents.changeReview)

    const [editingLocal, setEditingLocal] = useState(false)

    if (!id) {
        return null
    }

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const onCreate = async () => {
        const res = await createReview({
            userId: id,
            filmId
        })
        setEditingLocal(true)
        dispatch(onEdit())
    }

    // const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setContent(e.target.value)
    //     changeReview({
    //         content,
    //         id: 
    //     })
    // }

    return (
        <div className='w-full flex items-center flex-col justify-center gap-8 '>
            <div className='h-full w-full flex items-center justify-center pt-12 text-2xl font-bold'>
                No reviews yet, be first!
            </div>
            {editing || editingLocal ? (
                <Card className='bg-transparent p-0 w-full group relative min-w-fit h-full'>
                    <CardContent className='px-2'>
                        <ScrollArea className='h-[140px] max-w-full p-4'>
                            <Textarea onBlur={() => setEditingLocal(false)} value={content} onKeyDown={() => { }} onChange={() => { }} ref={inputRef} className='resize-none text-lg w-full h-full font-bold bg-transparent py-0 focus-visible:border-none focus-within:ring-0 focus-within:ring-offset-0 outline-none focus-visible:right-0 ring-0 focus-visible:ring-offset-0 ring-offset-0 border-none focus-visible:border-0 focus-visible:ring-0 scrollbar scrollbar-thumb-gray-500' />
                        </ScrollArea>
                    </CardContent>
                </Card>
            ) : <Button onClick={onCreate}><Pencil /></Button>}

        </div>
    )
}

export default NoReview