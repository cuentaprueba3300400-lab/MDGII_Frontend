// Enables client-side rendering for this component.
"use client"

// Importing necessary UI components from the "@/components/ui" directory.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Card components for displaying content in a structured way.
import { Badge } from "@/components/ui/badge" // Badge component for displaying status or labels.
import { Button } from "@/components/ui/button" // Button component for interactive elements.
// Importing icons from 'lucide-react' for visual representation.
import { Truck, MapPin, Clock, Fuel, Navigation } from "lucide-react" // Icons for truck, map pin, clock, fuel, and navigation.

// Defines the structure for a single resource (e.g., a truck or vehicle).
interface Resource {
  id: number // Unique identifier for the resource.
  name: string // Name of the resource (e.g., "Truck #001").
  type: string // Type of the resource (e.g., "Delivery Truck", "Van").
  location: string // Current geographical location or description.
  status: string // Current operational status (e.g., "available", "busy", "maintenance").
  capacity: string // Capacity of the resource (e.g., "1000 kg", "20 pallets").
}

// Defines the props for the LocationTracker component.
interface LocationTrackerProps {
  resources: Resource[] // An array of Resource objects to be tracked.
}

/**
 * LocationTracker component displays the real-time location and status of various resources.
 * It provides an overview of each resource, including its type, current location, status, and capacity.
 * Additionally, it features a section for geofencing alerts.
 *
 * @param {LocationTrackerProps} { resources } - The list of resources to display.
 * @returns {JSX.Element} The LocationTracker component.
 */
export function LocationTracker({ resources }: LocationTrackerProps) {
  return (
    <div className="space-y-6">
      {/* Main card for displaying resource location tracking. */}
      <Card>
        {/* Header for the resource location tracking section. */}
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" /> {/* Map pin icon for visual emphasis. */}
            <span>Resource Location Tracking</span> {/* Title of the section. */}
          </CardTitle>
        </CardHeader>
        {/* Content area for displaying individual resource cards. */}
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mapping through the resources array to render each resource as a Card. */}
            {resources.map((resource) => (
              <Card key={resource.id} className="border-2">
                <CardContent className="p-4">
                  {/* Header for each resource card, showing name and status. */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-primary" /> {/* Truck icon. */}
                      <h3 className="font-semibold text-foreground">{resource.name}</h3> {/* Resource name. */}
                    </div>
                    {/* Badge indicating the resource's status, with dynamic styling based on status. */}
                    <Badge
                      variant={
                        resource.status === "available"
                          ? "secondary"
                          : resource.status === "busy"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {resource.status} {/* Displaying the resource's status. */}
                    </Badge>
                  </div>

                  {/* Details section for each resource. */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Type:</span> {/* Label for resource type. */}
                      <span className="font-medium">{resource.type}</span> {/* Resource type. */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" /> {/* Map pin icon for location. */}
                      <span>{resource.location}</span> {/* Resource location. */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Capacity:</span> {/* Label for resource capacity. */}
                      <span className="font-medium">{resource.capacity}</span> {/* Resource capacity. */}
                    </div>
                  </div>

                  {/* Footer section of each resource card with last update, fuel, and live tracking button. */}
                  <div className="mt-4 pt-3 border-t space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" /> {/* Clock icon for last update. */}
                        <span>Last Update: 2 min ago</span> {/* Placeholder for last update time. */}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Fuel className="w-3 h-3" /> {/* Fuel icon. */}
                        <span>85%</span> {/* Placeholder for fuel level. */}
                      </div>
                    </div>

                    {/* Button to track the resource live. */}
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Navigation className="w-3 h-3 mr-1" /> {/* Navigation icon. */}
                      Track Live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geofencing Alerts section. */}
      <Card>
        <CardHeader>
          <CardTitle>Geofencing & Alerts</CardTitle> {/* Title for geofencing alerts. */}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Example alert: Truck entered delivery zone. */}
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" /> {/* Green dot for success/entry. */}
                <span className="text-sm">Truck #001 entered delivery zone</span> {/* Alert message. */}
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span> {/* Time of alert. */}
            </div>

            {/* Example alert: Van delayed at checkpoint. */}
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" /> {/* Yellow dot for warning/delay. */}
                <span className="text-sm">Van #003 delayed at checkpoint</span> {/* Alert message. */}
              </div>
              <span className="text-xs text-muted-foreground">12 min ago</span> {/* Time of alert. */}
            </div>

            {/* Example alert: Truck completed maintenance. */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" /> {/* Blue dot for informational/completion. */}
                <span className="text-sm">Truck #005 completed maintenance</span> {/* Alert message. */}
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span> {/* Time of alert. */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
