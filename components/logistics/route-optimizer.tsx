// Habilita el modo cliente para este componente, lo que permite el uso de hooks y características interactivas.
"use client"

// Importaciones de React hooks.
import { useState } from "react"
// Importaciones de componentes de la interfaz de usuario de shadcn/ui.
// Card: Un contenedor flexible para agrupar contenido relacionado.
// CardContent: El área de contenido principal dentro de una Card.
// CardHeader: La sección de encabezado de una Card, a menudo utilizada para títulos.
// CardTitle: El título principal dentro de una CardHeader.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Button: Un componente de botón interactivo.
import { Button } from "@/components/ui/button"
// Input: Un componente de entrada de texto.
import { Input } from "@/components/ui/input"
// Label: Un componente de etiqueta para elementos de formulario.
import { Label } from "@/components/ui/label"
// Select, SelectContent, SelectItem, SelectTrigger, SelectValue: Componentes para un menú desplegable de selección.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Badge: Un pequeño componente de etiqueta para mostrar el estado o categorías.
import { Badge } from "@/components/ui/badge"
// Separator: Un componente para dividir visualmente el contenido.
import { Separator } from "@/components/ui/separator"
// Importaciones de iconos de la biblioteca lucide-react.
// Route: Icono para representar una ruta.
// Zap: Icono para representar velocidad o optimización.
// Clock: Icono para representar el tiempo.
// Fuel: Icono para representar el combustible.
// MapPin: Icono para representar una ubicación en un mapa.
// Settings: Icono para representar la configuración.
import { Route, Zap, Clock, Fuel, MapPin, Settings } from "lucide-react"

/**
 * `RouteOptimizer` es un componente funcional que permite a los usuarios configurar
 * y ejecutar la optimización de rutas, y luego muestra los resultados de la optimización.
 * Incluye configuraciones para la prioridad de optimización, tipo de vehículo, número máximo de paradas,
 * ventana de tiempo y ubicaciones de entrega.
 */
export function RouteOptimizer() {
  // Estado para controlar si el proceso de optimización está en curso.
  const [isOptimizing, setIsOptimizing] = useState(false)
  // Estado para almacenar los resultados de la optimización una vez completada.
  const [optimizationResults, setOptimizationResults] = useState(null)

  /**
   * `handleOptimize` es una función que simula el proceso de optimización de rutas.
   * Establece `isOptimizing` en `true` para mostrar un estado de carga,
   * simula un retraso de 3 segundos y luego actualiza `optimizationResults` con datos simulados.
   */
  const handleOptimize = () => {
    setIsOptimizing(true)
    // Simula el proceso de optimización
    setTimeout(() => {
      setOptimizationResults({
        originalDistance: 127.5,
        optimizedDistance: 89.2,
        timeSaved: "1h 45m",
        fuelSaved: "12.3L",
        costSaved: "$45.60",
      })
      setIsOptimizing(false)
    }, 3000)
  }

  return (
    // Contenedor principal que organiza el diseño en una cuadrícula.
    // En pantallas grandes (lg), se divide en 2 columnas.
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      /* Sección de Configuración de Optimización */
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuración de Optimización de Rutas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            /* Campo de selección para la prioridad de optimización */
            <div>
              <Label htmlFor="optimization-type">Prioridad de Optimización</Label>
              <Select defaultValue="distance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distancia más Corta</SelectItem>
                  <SelectItem value="time">Tiempo más Rápido</SelectItem>
                  <SelectItem value="fuel">Eficiencia de Combustible</SelectItem>
                  <SelectItem value="cost">Costo más Bajo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            /* Campo de selección para el tipo de vehículo */
            <div>
              <Label htmlFor="vehicle-type">Tipo de Vehículo</Label>
              <Select defaultValue="truck">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="truck">Camión Pesado</SelectItem>
                  <SelectItem value="van">Furgoneta de Reparto</SelectItem>
                  <SelectItem value="motorcycle">Motocicleta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            /* Campo de entrada para el número máximo de paradas */
            <div>
              <Label htmlFor="max-stops">Máximo de Paradas por Ruta</Label>
              <Input id="max-stops" type="number" defaultValue="15" />
            </div>

            /* Campos de entrada para la ventana de tiempo */
            <div>
              <Label htmlFor="time-window">Ventana de Tiempo</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" defaultValue="08:00" />
                <Input type="time" defaultValue="18:00" />
              </div>
            </div>
          </div>

          <Separator />

          /* Sección de ubicaciones de entrega */
          <div className="space-y-3">
            <h4 className="font-medium">Ubicaciones de Entrega</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {[
                "123 Main St, Downtown",
                "456 Oak Ave, Midtown",
                "789 Pine Rd, Uptown",
                "321 Elm St, Westside",
                "654 Maple Dr, Eastside",
              ].map((address, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-secondary/20 rounded">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{address}</span>
                </div>
              ))}
            </div>
          </div>

          /* Botón para iniciar la optimización */
          <Button onClick={handleOptimize} disabled={isOptimizing} className="w-full">
            {isOptimizing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Optimizando Rutas...
              </>
            ) : (
              <>
                <Route className="w-4 h-4 mr-2" />
                Optimizar Rutas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      /* Sección de Resultados de Optimización */
      <Card>
        <CardHeader>
          <CardTitle>Resultados de Optimización</CardTitle>
        </CardHeader>
        <CardContent>
          {optimizationResults ? (
            <div className="space-y-6">
              /* Comparación de distancia original y optimizada */
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Ruta Original</p>
                  <p className="text-2xl font-bold text-foreground">{optimizationResults.originalDistance} km</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Ruta Optimizada</p>
                  <p className="text-2xl font-bold text-primary">{optimizationResults.optimizedDistance} km</p>
                </div>
              </div>

              /* Métricas de ahorro (tiempo, combustible, costo) */
              <div className="space-y-3">
                /* Ahorro de tiempo */
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Tiempo Ahorrado</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    {optimizationResults.timeSaved}
                  </Badge>
                </div>

                /* Ahorro de combustible */
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Combustible Ahorrado</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {optimizationResults.fuelSaved}
                  </Badge>
                </div>

                /* Ahorro de costo */
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">💰</span>
                    <span className="text-sm font-medium">Costo Ahorrado</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    {optimizationResults.costSaved}
                  </Badge>
                </div>
              </div>

              /* Secuencia de ruta optimizada */
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Secuencia de Ruta Optimizada</h4>
                <div className="space-y-2">
                  {[
                    "Warehouse Central (Inicio)",
                    "123 Main St, Downtown",
                    "321 Elm St, Westside",
                    "789 Pine Rd, Uptown",
                    "456 Oak Ave, Midtown",
                    "654 Maple Dr, Eastside",
                    "Warehouse Central (Fin)",
                  ].map((stop, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              /* Botón para aplicar la ruta optimizada */
              <Button className="w-full">Aplicar Ruta Optimizada</Button>
            </div>
          ) : (
            // Mensaje cuando no hay resultados de optimización
            <div className="text-center py-12">
              <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Ejecute la optimización para ver los resultados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
