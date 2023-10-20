'use client'
import { useParams } from 'next/navigation'
import React from 'react'


const FilmPage = () => {

    const params = useParams()

    return (
        <div className='pt-16'>
            {params.filmId}
        </div>
    )
}

export default FilmPage