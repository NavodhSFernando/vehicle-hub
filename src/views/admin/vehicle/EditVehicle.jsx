import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import EditVehicleDetails from './EditVehicleDetails'
import EditVehiclePhotos from './EditVehiclePhotos'

export default function EditVehicle() {
    const { vehicleId } = useParams()
    console.log(vehicleId)
    return (
        <>
            <Tabs defaultValue="vehicleDetails" className="w-full">
                <TabsList className="grid w-1/2 grid-cols-2">
                    <TabsTrigger value="vehicleDetails">Vehicle Details</TabsTrigger>
                    <TabsTrigger value="vehicleImages">Vehicle Images</TabsTrigger>
                </TabsList>
                <TabsContent value="vehicleDetails">
                    <EditVehicleDetails vehicleId={vehicleId} />
                </TabsContent>
                <TabsContent value="vehicleImages">
                    <EditVehiclePhotos vehicleId={vehicleId} />
                </TabsContent>
            </Tabs>
        </>
    )
}
