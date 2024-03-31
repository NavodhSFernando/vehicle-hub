import React from 'react'
import Image from '../../assets/images/index-image.png'
import BookingStrip from '../../components/front/BookingStrip/BookingStrip'

export default function Home() {
    return (
       
        
               <div className="relative h-screen">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Image})` }}></div>
                  <div className="absolute bottom-12 left-0 right-0 pb-32">
                    <div className="flex justify-center items-end h-full">
                        <BookingStrip />
                    </div>
                   </div>
              </div> 
        
     )
}
