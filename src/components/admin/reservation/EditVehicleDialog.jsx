import { Copy } from 'lucide-react'

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

const data = [
    {
        key: '001',
        name: 'Aqua',
        type: 'SUV',
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Nissan',
        transmission: 'Manual',
        capacity: '4 Persons',
        price: '15000'
    },
    {
        key: '002',
        name: 'Toyota prius',
        type: 'Sedan',
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '6 Persons',
        price: '15000'
    },
    {
        key: '003',
        name: 'Toyota prius',
        type: 'SUV',
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '3 Persons',
        price: '15000'
    },
    {
        key: '004',
        name: 'Toyota prius',
        type: 'Sedan',
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '6 Persons',
        price: '15000'
    },
    {
        key: '005',
        name: 'Toyota prius',
        type: 'Sedan',
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '4 Persons',
        price: '9000'
    },
    {
        key: '006',
        name: 'Toyota prius',
        type: 'Sedan',
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '4 Persons',
        price: '6000'
    }
]

export function EditVehicleDialog() {
    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

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
                            id={tag.id}
                            name={tag.name}
                            make={tag.make}
                            type={tag.type}
                            year={tag.year}
                            transmission={tag.transmission}
                            capacity={tag.capacity}
                            price={tag.price}
                        />
                    ))}
                </ScrollArea>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
