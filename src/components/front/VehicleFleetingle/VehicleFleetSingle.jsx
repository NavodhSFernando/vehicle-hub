import React from 'react'
import { useParams } from 'react-router-dom'

export default function VehicleFleetSingle() {
    const { slug } = useParams()
    console.log(slug)
    return <div>{slug}</div>
}
