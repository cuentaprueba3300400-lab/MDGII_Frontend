// Habilita el modo cliente para este componente, lo que permite el uso de hooks y características interactivas.
"use client"

// Importaciones de componentes de la interfaz de usuario de shadcn/ui.
// Card: Un contenedor flexible para agrupar contenido relacionado.
// CardContent: El área de contenido principal dentro de una Card.
// CardHeader: La sección de encabezado de una Card, a menudo utilizada para títulos.
// CardTitle: El título principal dentro de una CardHeader.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Button: Un componente de botón interactivo.
import { Button } from "@/components/ui/button"
// Badge: Un pequeño componente de etiqueta para mostrar el estado o categorías.
import { Badge } from "@/components/ui/badge"
// Importaciones de iconos de la biblioteca lucide-react.
// MapPin: Icono para representar una ubicación en un mapa.
// Navigation: Icono para representar la navegación o una ruta.
// Truck: Icono para representar un vehículo de transporte.
// AlertTriangle: Icono para representar una advertencia o alerta.
import { MapPin, Navigation, Truck, AlertTriangle } from "lucide-react"

/**
 * `MapView` es un componente funcional que muestra una vista de mapa simulada
 * con ubicaciones de ejemplo y detalles relacionados.
 * Permite visualizar almacenes, puntos de entrega y vehículos en un mapa interactivo.
 */
export function MapView() {
  // Datos estáticos de ejemplo para ubicaciones que se mostrarán en el mapa.
  // Cada objeto representa una ubicación con un ID, nombre, tipo, coordenadas (latitud y longitud) y estado.
  const locations = [
    { id: 1, name: "Warehouse Central", type: "warehouse", lat: 40.7128, lng: -74.006, status: "active" },
    { id: 2, name: "Client A", type: "delivery", lat: 40.7589, lng: -73.9851, status: "pending" },
    { id: 3, name: "Client B", type: "delivery", lat: 40.6892, lng: -74.0445, status: "completed" },
    { id: 4, name: "Truck #001", type: "vehicle", lat: 40.7282, lng: -73.9942, status: "moving" },
  ]

  return (
    // Contenedor principal que organiza el diseño en una cuadrícula.
    // En pantallas grandes (lg), se divide en 3 columnas, con el mapa ocupando 2 y los detalles 1.
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contenedor del mapa */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Vista de Mapa en Vivo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Área simulada para la integración del mapa. */}
          {/* Muestra un mensaje de marcador de posición y algunos marcadores simulados. */}
          <div className="relative bg-secondary/20 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-secondary">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Integración de Mapa Interactivo</p>
              <p className="text-sm text-muted-foreground">Seguimiento de vehículos en tiempo real y visualización de rutas</p>
            </div>

            {/* Marcadores de mapa simulados */}
            <div className="absolute top-4 left-4 space-y-2">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-sm"
                >
                  {/* Indicador de color basado en el tipo de ubicación */}
                  <div
                    className={`w-3 h-3 rounded-full ${
                      location.type === "warehouse"
                        ? "bg-blue-500"
                        : location.type === "delivery"
                          ? "bg-green-500"
                          : "bg-orange-500"
                    }`}
                  />
                  <span className="text-xs font-medium">{location.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalles de la ubicación */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {/* Tarjeta de resumen para almacenes */}
            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium">Almacenes</span>
              </div>
              <span className="text-sm text-muted-foreground">3 activos</span>
            </div>

            {/* Tarjeta de resumen para puntos de entrega */}
            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Puntos de Entrega</span>
              </div>
              <span className="text-sm text-muted-foreground">24 pendientes</span>
            </div>

            {/* Tarjeta de resumen para vehículos */}
            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm font-medium">Vehículos</span>
              </div>
              <span className="text-sm text-muted-foreground">8 en seguimiento</span>
            </div>
          </div>

          {/* Sección de alertas recientes */}
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Alertas Recientes</h4>
            <div className="space-y-2">
              {/* Alerta de retraso de tráfico */}
              <div className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">Retraso de tráfico en la Ruta 3</span>
              </div>
              {/* Alerta de entrega completada */}
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Truck className="w-4 h-4 text-green-600" />
                <span className="text-sm">Entrega completada en Cliente B</span>
              </div>
            </div>
          </div>

          {/* Botón para centrar en rutas activas */}
          <Button className="w-full">
            <Navigation className="w-4 h-4 mr-2" />
            Centrar en Rutas Activas
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
