// Enables client-side rendering for this component.
"use client"

// Importing necessary React hooks.
import { useState } from "react" // useState hook for managing component state.
// Importing UI components from the "@/components/ui" directory.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Card components for displaying content.
import { Button } from "@/components/ui/button" // Button component for interactive elements.
import { Badge } from "@/components/ui/badge" // Badge component for displaying status or labels.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Tabs components for organizing content into different views.
// Importing local components for logistics features.
import { MapView } from "./map-view" // Component for displaying a map view.
import { RouteOptimizer } from "./route-optimizer" // Component for optimizing routes.
import { LocationTracker } from "./location-tracker" // Component for tracking resource locations.
// Importing icons from 'lucide-react' for visual representation.
import { Route, Navigation, Clock, Truck } from "lucide-react" // Icons for route, navigation, clock, and truck.

/**
 * LogisticsManagement component provides a comprehensive dashboard for managing logistics operations.
 * It includes features for route management, resource tracking, and route optimization, presented
 * through a tabbed interface.
 *
 * @returns {JSX.Element} The LogisticsManagement component.
 */
export function LogisticsManagement() {
  // State to manage the currently active tab view.
  const [activeView, setActiveView] = useState("map")

  // Static data representing a list of logistics routes.
  const routes = [
    {
      id: 1, // Unique identifier for the route.
      name: "Downtown Delivery Route", // Name of the route.
      status: "active", // Current status of the route (e.g., "active", "planned", "completed").
      driver: "Carlos Rodriguez", // Driver assigned to the route.
      stops: 8, // Number of stops on the route.
      distance: "45.2 km", // Total distance of the route.
      estimatedTime: "3h 20m", // Estimated time for route completion.
      progress: 62, // Completion progress percentage.
    },
    {
      id: 2,
      name: "Industrial Zone Route",
      status: "planned",
      driver: "Maria Santos",
      stops: 12,
      distance: "67.8 km",
      estimatedTime: "4h 45m",
      progress: 0,
    },
    {
      id: 3,
      name: "Residential Area Route",
      status: "completed",
      driver: "Juan Perez",
      stops: 15,
      distance: "52.3 km",
      estimatedTime: "4h 10m",
      progress: 100,
    },
  ]

  // Static data representing a list of resources (e.g., trucks, vans).
  const resources = [
    {
      id: 1, // Unique identifier for the resource.
      name: "Truck #001", // Name of the resource.
      type: "Heavy Duty", // Type of the resource.
      location: "Warehouse A", // Current location of the resource.
      status: "available", // Current status of the resource.
      capacity: "5000 kg", // Carrying capacity of the resource.
    },
    {
      id: 2,
      name: "Van #003",
      type: "Light Delivery",
      location: "En Route",
      status: "busy",
      capacity: "1500 kg",
    },
    {
      id: 3,
      name: "Truck #005",
      type: "Medium",
      location: "Maintenance",
      status: "maintenance",
      capacity: "3000 kg",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header section with title, description, and a button to create a new route. */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Logistics & Routes</h1> {/* Main title. */}
          <p className="text-muted-foreground">Manage routes, track resources, and optimize deliveries</p> {/* Description. */}
        </div>
        {/* Button to create a new route. */}
        <Button className="bg-primary hover:bg-primary/90">
          <Route className="w-4 h-4 mr-2" /> {/* Route icon. */}
          Create New Route
        </Button>
      </div>

      {/* Key Metrics section displaying important logistics statistics. */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card for Active Routes. */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Route className="w-5 h-5 text-primary" /> {/* Route icon. */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p> {/* Metric label. */}
                <p className="text-2xl font-bold text-foreground">12</p> {/* Metric value. */}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Card for Available Vehicles. */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" /> {/* Truck icon. */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Vehicles</p> {/* Metric label. */}
                <p className="text-2xl font-bold text-foreground">8</p> {/* Metric value. */}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Card for Total Distance. */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-primary" /> {/* Navigation icon. */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Distance</p> {/* Metric label. */}
                <p className="text-2xl font-bold text-foreground">342 km</p> {/* Metric value. */}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Card for Average Delivery Time. */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" /> {/* Clock icon. */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</p> {/* Metric label. */}
                <p className="text-2xl font-bold text-foreground">2.5h</p> {/* Metric value. */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs component for navigating between different logistics views. */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        {/* List of tab triggers. */}
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger> {/* Tab for Map View. */}
          <TabsTrigger value="routes">Route Management</TabsTrigger> {/* Tab for Route Management. */}
          <TabsTrigger value="resources">Resource Tracking</TabsTrigger> {/* Tab for Resource Tracking. */}
          <TabsTrigger value="optimizer">Route Optimizer</TabsTrigger> {/* Tab for Route Optimizer. */}
        </TabsList>

        {/* Content for the Map View tab. */}
        <TabsContent value="map" className="space-y-4">
          <MapView /> {/* Renders the MapView component. */}
        </TabsContent>

        {/* Content for the Route Management tab. */}
        <TabsContent value="routes" className="space-y-4">
          {/* Card displaying active routes. */}
          <Card>
            <CardHeader>
              <CardTitle>Active Routes</CardTitle> {/* Title for active routes section. */}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mapping through the routes array to display each route. */}
                {routes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {/* Icon for the route. */}
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Route className="w-6 h-6 text-primary" />
                      </div>
                      {/* Route details: name, driver, stops, distance, estimated time. */}
                      <div>
                        <h3 className="font-semibold text-foreground">{route.name}</h3>
                        <p className="text-sm text-muted-foreground">Driver: {route.driver}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">{route.stops} stops</span>
                          <span className="text-xs text-muted-foreground">{route.distance}</span>
                          <span className="text-xs text-muted-foreground">{route.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    {/* Route progress and status badge. */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        {/* Progress bar for the route. */}
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${route.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{route.progress}% complete</p>
                      </div>
                      {/* Badge indicating the route's status, with dynamic styling. */}
                      <Badge
                        variant={
                          route.status === "active" ? "default" : route.status === "completed" ? "secondary" : "outline"
                        }
                      >
                        {route.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content for the Resource Tracking tab. */}
        <TabsContent value="resources" className="space-y-4">
          <LocationTracker resources={resources} /> {/* Renders the LocationTracker component with resource data. */}
        </TabsContent>

        {/* Content for the Route Optimizer tab. */}
        <TabsContent value="optimizer" className="space-y-4">
          <RouteOptimizer /> {/* Renders the RouteOptimizer component. */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
