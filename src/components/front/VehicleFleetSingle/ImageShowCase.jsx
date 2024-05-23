import React, { useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

import vitz from '../../../assets/vehicles/vitz.jpg'
import vitzinterior from '../../../assets/vehicles/vitzinterior.jpg'
import vitsseats from '../../../assets/vehicles/vitzseats.jpg'

export default function ImageShowCase() {
    const images = [vitz, vitzinterior, vitsseats]

    const [currentImage, setCurrentImage] = useState(images[0])
    return (
        <div className="w-[584px] grid grid-rows-[380px_auto] rounded-t-lg gap-9 bg-white overflow-hidden">
            <img className="justify-self-center w-[500px] self-center rounded-lg" src={currentImage} alt="" />
            <div className="w-full sm:max-w-[550px] max-w-[300px] justify-self-center items-center p-10">
                <Slide slidesToScroll={1} slidesToShow={3} cssClass="objects-center" autoplay={false}>
                    {images.map((image, index) => (
                        <button onClick={() => setCurrentImage(image)} className={currentImage === image && 'border-8'}>
                            <img key={index} className="rounded-lg" src={image} alt="" />
                        </button>
                    ))}
                </Slide>
            </div>
        </div>
    )
}
