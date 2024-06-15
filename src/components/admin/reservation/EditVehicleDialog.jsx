import { Button } from '../../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../ui/dialog'
import { GrEdit } from 'react-icons/gr'
import { ScrollArea } from '../../ui/scroll-area'
import VehicleCard from './VehicleCard'
import { useState, useEffect } from 'react'
import { get } from 'react-hook-form'
import axios from 'axios'

// const data = [
//     {
//         key: '001',
//         name: 'Aqua',
//         type: 'SUV',
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Nissan',
//         transmission: 'Manual',
//         capacity: '4 Persons',
//         price: '15000'
//     },
//     {
//         key: '002',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '6 Persons',
//         price: '15000'
//     },
//     {
//         key: '003',
//         name: 'Toyota prius',
//         type: 'SUV',
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '3 Persons',
//         price: '15000'
//     },
//     {
//         key: '004',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '6 Persons',
//         price: '15000'
//     },
//     {
//         key: '005',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '4 Persons',
//         price: '9000'
//     },
//     {
//         key: '006',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '4 Persons',
//         price: '6000'
//     }
// ]

export function EditVehicleDialog({ customerReservationId, refetchReservation }) {
    const [data, setData] = useState([])
    useEffect(() => {
        const getAvailableVehicles = async () => {
            const url = `http://localhost:5062/api/AdminReservation/Available-Vehicles/${customerReservationId}`
            try {
                const response = await axios.get(url)
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAvailableVehicles()
    }, [customerReservationId])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="p-0">
                    <GrEdit fontSize={24} className="mr-1" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Available Vehicles</DialogTitle>
                    <DialogDescription>
                        List of available vehicles in accordance to reservation details.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 w-full border-none">
                    {data.map((tag) => (
                        <VehicleCard
                            key={tag.key}
                            id={tag.id}
                            name={tag.name}
                            make={tag.make}
                            type={tag.type}
                            year={tag.year}
                            transmission={tag.transmission}
                            capacity={tag.seatingCapacity}
                            price={tag.costPerDay}
                            imageSrc={tag.thumbnail}
                            customerReservationId={customerReservationId}
                            refetchReservation={refetchReservation}
                        />
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
