import React, { useState, useEffect } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ImageShowCase() {
    const { id } = useParams()
    const [images, setImages] = useState([])
    const [currentImage, setCurrentImage] = useState('')
    const [loading, setLoading] = useState(true)

    const baseFrontImgUrl = 'https://vehiclehubimages.blob.core.windows.net/front/'
    const baseRearImgUrl = 'https://vehiclehubimages.blob.core.windows.net/rear/'
    const baseDashboardUrl = 'https://vehiclehubimages.blob.core.windows.net/dashboard/'
    const baseInteriorUrl = 'https://vehiclehubimages.blob.core.windows.net/interior/'

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5062/api/FrontVehicleService/Images/${id}`)
            const data = response.data
            const frontSrc = `${baseFrontImgUrl}${data.frontImg}`
            const rearSrc = `${baseRearImgUrl}${data.rearImg}`
            const dashboardSrc = `${baseDashboardUrl}${data.dashboardImg}`
            const interiorSrc = `${baseInteriorUrl}${data.interiorImg}`
            const imageList = [frontSrc, rearSrc, dashboardSrc, interiorSrc]
            setImages(imageList)
            setCurrentImage(imageList[0]) // Set the first image as the default current image
            setLoading(false) // Images are loaded
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <div className="w-full flex flex-col pt-12 rounded-t-lg gap-10 bg-white overflow-hidden">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <img className="justify-self-center w-3/4 self-center rounded-lg" src={currentImage} alt="" />
                    <div className="w-full md:w-3/4 mx-auto px-6 pt-2 pb-4">
                        <Slide
                            slidesToScroll={1}
                            slidesToShow={4}
                            cssClass="objects-center"
                            transitionDuration={500}
                            autoplay={false}
                        >
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(image)}
                                    className={`${
                                        currentImage === image ? 'border border-gray-200' : ''
                                    } w-24 h-24 p-1`}
                                >
                                    <img
                                        className="w-full h-full object-cover rounded-lg"
                                        src={image}
                                        alt={`vehicle view ${index}`}
                                        onLoad={() => {
                                            // Force a repaint when the image is loaded
                                            setLoading(false)
                                        }}
                                    />
                                </button>
                            ))}
                        </Slide>
                    </div>
                </>
            )}
        </div>
    )
}
