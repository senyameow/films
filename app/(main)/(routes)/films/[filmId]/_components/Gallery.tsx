import React from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import GalleryTab from './GalleryTab'

interface GalleryProps {
    images: string[]
}

const Gallery = ({ images }: GalleryProps) => {
    return (
        <Tab.Group as='div' className={`flex flex-col-reverse col-span-5`}>
            <div className='mx-auto mt-6 max-w-2xl hidden sm:block lg:max-w-none'>
                <Tab.List className={`grid grid-cols-4 gap-2`}>
                    {images?.map((image, ind) => (
                        <GalleryTab key={ind} image={image} />
                    ))}
                </Tab.List>
            </div>

            <Tab.Panels className={`aspect-[1200/800] w-full h-full rounded-lg relative`}>
                {images?.map((image, ind) => (
                    <Tab.Panel key={ind} className={`w-full h-full relative`}>
                        <Image src={image} alt='main image' className='object-cover rounded-lg' fill />
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>

    )
}

export default Gallery