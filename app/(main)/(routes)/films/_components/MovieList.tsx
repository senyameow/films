'use client'
import React from 'react'

const MovieList = () => {
    return (
        <div className='px-4 md:px-12 h-full pt-36 bg-dark'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                <div className='w-[330px] h-[200px] border-red-400 border mx-auto' />
                <div className='w-[330px] h-[200px] border-red-400 border mx-auto' />
                <div className='w-[330px] h-[200px] border-red-400 border mx-auto' />
                <div className='w-[330px] h-[200px] border-red-400 border mx-auto' />
            </div>
        </div>
    )
}

export default MovieList