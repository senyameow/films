import { Button, buttonVariants } from '@/components/ui/button'
import { Doc } from '@/convex/_generated/dataModel'
import { Info, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BillboardProps {
    film: Doc<'films'>
}

const Billboard = ({ film }: BillboardProps) => {



    return (
        <div className='relative top-0 h-[50.25vw] mb-12 hidden sm:block'>
            <video className='w-full object-cover h-full relative' autoPlay muted loop poster={film.cover_url} src={film.video_url}></video>
            <div className='absolute top-[30%] w-fit h-full left-16'>
                <div className='flex items-start gap-6 flex-col'>
                    <h2 className='text-2xl md:text-3xl xl:text-7xl font-bold'>{film.title}</h2>
                    <p className='drop-shadow-xl shadow-black text-xl md:text-2xl xl:text-2xl max-w-[600px] font-semibold'>{film.description}</p>
                    <div className='flex items-center gap-2'>
                        <Button className=''>
                            Watch Now
                            <Video className='w-4 h-4 ml-2' />
                        </Button>
                        <Link href={`/films/${film._id}`} className={buttonVariants({ variant: 'default' })}>
                            More Info
                            <Info className='w-4 h-4 ml-2' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billboard