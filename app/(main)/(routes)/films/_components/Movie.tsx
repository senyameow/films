import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

interface MovieProps {
    film: Doc<'films'>;

}

const Movie = ({ film }: MovieProps) => {
    return (
        <div key={film._id} className='w-full h-full min-w-[300px] mx-auto relative group bg-zinc-900 col-span'>
            <img src={film.cover_url} alt="film" className='object-cover h-full w-full rounded cursor-pointer transition duration-300 shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300' />
            <div className=' opacity-0 group-hover:opacity-100 invisible sm:visible z-10 duration-200 absolute transition top-0 delay-300 group-hover:scale-110 group-hover:-translate-y-[75px] group-hover:translate-x-[20px]'>
                <img src={film.cover_url} alt="film" className='cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full ' />
                <div className='z-10 p-2 lg:p-4 absolute w-full bg-neutral-100 transition shadow-md rounded-b-md'>
                    <span className='text-black'>qwe</span>
                </div>
            </div>
        </div>
    )
}

export default Movie