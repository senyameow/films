'use client'
import { Doc } from '@/convex/_generated/dataModel'
import React, { useRef } from 'react'

interface VideoPreviewProps {
    film: Doc<'films'>
}

const VideoPreview = ({ film }: VideoPreviewProps) => {

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
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                src={film.video_url}
                muted
                poster={film.cover_url}
                className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full"
            />
        </div>
    )
}

export default VideoPreview