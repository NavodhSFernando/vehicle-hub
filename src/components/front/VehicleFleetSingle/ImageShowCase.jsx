import React, { useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

export default function ImageShowCase() {
    const images = [
        'https://cdn.discordapp.com/attachments/510829749065744405/1213122972315816007/Car.png?ex=66193dcf&is=6606c8cf&hm=508c782f04a5aeb8f23f093e83378dbe0e3050e26166f274b0b5972a08ce2548&',
        'https://cdn.discordapp.com/attachments/510829749065744405/1213119457686331432/View_2.png?ex=66193a89&is=6606c589&hm=279e097ef4fd4451961e3f33d7961c8279bced114e387b41ff1ce9dfb2732a19&',
        'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
    ]

    const [currentImage, setCurrentImage] = useState(images[0])
    return (
        <div className="max-w-[600px] w-full grid grid-rows-[380px_auto] rounded-t-lg gap-9 bg-white overflow-hidden mx-6">
            <img className="justify-self-center w-[500px] self-center" src={currentImage} alt="" />
            <div className="w-full sm:max-w-[550px] max-w-[300px] justify-self-center items-center p-10 ">
                <Slide slidesToScroll={1} slidesToShow={3} cssClass="objects-center" autoplay={false} responsive={2}>
                    {images.map((image, index) => (
                        <button onClick={() => setCurrentImage(image)}>
                            <img key={index} className="" src={image} alt="" />
                        </button>
                    ))}
                </Slide>
            </div>
        </div>
    )
}
