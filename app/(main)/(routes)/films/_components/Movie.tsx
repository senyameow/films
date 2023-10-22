import PlayButton from '@/components/PlayButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { Doc } from '@/convex/_generated/dataModel'
import { secondsToFilmDuration } from '@/lib/utils';
import React, { useRef } from 'react'
import { Info, MoreHorizontal } from 'lucide-react';
import { useAppDispatch } from '@/hooks/redux';
import { moreInfoSlice } from '@/store/reducers/MoreInfoSlice';
import { IUser } from '@/models/IUser';

interface MovieProps {
    film: Doc<'films'>;
    user: IUser;
}

const Movie = ({ film, user }: MovieProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);


    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Set the video's current time to 0 to restart playback.
            videoRef.current.play(); // Start playing the video.
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            setTimeout(() => {
                videoRef?.current?.pause(); // Pause the video when the mouse leaves.
            }, 300);
        }
    }

    const dispatch = useAppDispatch()
    const { onOpen } = moreInfoSlice.actions

    return (
        <div key={film._id} className='w-full h-full min-w-[300px] mx-auto relative group bg-zinc-900 col-span'>
            <img src={film.cover_url} alt="film" className='object-cover h-full w-full rounded cursor-pointer transition duration-300 shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300' />
            <div onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} className=' opacity-0 group-hover:opacity-100 invisible sm:visible z-10 duration-200 absolute transition top-0 delay-300 group-hover:scale-110 group-hover:-translate-y-[75px] group-hover:translate-x-[20px]'>
                <video
                    ref={videoRef}
                    src={film.video_url}
                    muted
                    poster={film.cover_url}
                    className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full"
                />
                <div className='absolute bottom-2 right-2'>
                    <Info role='button' onClick={() => dispatch(onOpen({ film, user }))} className='w-6 h-6' />
                </div>
                <div className='z-10 p-2 lg:p-4 absolute w-full bg-neutral-800 transition shadow-md rounded-b-md'>
                    <div className='flex flex-col gap-4 items-start'>
                        <div className='flex flex-row w-full justify-between gap-2 items-center'>
                            <PlayButton id={film._id} className='text-sm' />
                            <span className='font-semibold'>{secondsToFilmDuration(film.duration)}</span>
                        </div>
                        <div className='text-sm font-semibold'>
                            {film.genre}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie