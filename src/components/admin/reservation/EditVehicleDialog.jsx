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

export function EditVehicleDialog() {
    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="p-0">
                    <GrEdit fontSize={24} className="mr-1" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Available Vehicles</DialogTitle>
                    <DialogDescription>
                        List of available vehicles in accordance to reservation details.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 w-48 rounded-md border">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                        {tags.map((tag) => (
                            <>
                                <div key={tag} className="text-sm">
                                    {tag}
                                </div>
                                {/* <Separator className="my-2" /> */}
                            </>
                        ))}
                    </div>
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
