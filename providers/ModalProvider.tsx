'use client'
import CreateReview from '@/components/modals/CreateReviewModal'
import MoreInfoModal from '@/components/modals/MoreInfoModal'
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <MoreInfoModal />
            <CreateReview />
        </>
    )
}

export default ModalProvider