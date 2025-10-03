// Habilita el modo cliente para este componente, lo que permite el uso de hooks y otras funcionalidades de React en el navegador.
"use client"

// Importaciones de React y componentes de UI de la biblioteca local.
import { useState } from "react" // Hook para manejar el estado en componentes funcionales.
import { Button } from "@/components/ui/button" // Componente de botón interactivo.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para mostrar contenido en tarjetas.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Componentes para selectores desplegables.
import { Badge } from "@/components/ui/badge" // Componente para etiquetas o indicadores de estado.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Componentes para navegación por pestañas.

// Importaciones de componentes específicos de Gantt desde el mismo directorio.
import { GanttChart } from "./gantt-chart" // Componente principal del gráfico de Gantt.
import { CriticalPathAnalysis } from "./critical-path-analysis" // Componente para el análisis de la ruta crítica.
import { TimelineControls } from "./timeline-controls" // Componente para controles de la línea de tiempo.

// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { Calendar, BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react"

// Datos estáticos que simulan una lista de proyectos.
const mockProjects = [
  {
    id: "1", // Identificador único del proyecto.
    name: "Website Redesign", // Nombre del proyecto.
    startDate: "2024-01-01", // Fecha de inicio del proyecto.
    endDate: "2024-01-15", // Fecha de finalización del proyecto.
    progress: 75, // Porcentaje de progreso del proyecto.
    status: "In Progress", // Estado actual del proyecto.
  },
  {
    id: "2",
    name: "Mobile App Development",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    progress: 25,
    status: "Planning",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    progress: 90,
    status: "Review",
  },
]

// Datos estáticos para las estadísticas del gráfico de Gantt.
const ganttStats = [
  {
    title: "Active Projects", // Título de la estadística.
    value: "3", // Valor de la estadística.
    change: "+1 this month", // Cambio o descripción adicional.
    icon: BarChart3, // Icono asociado a la estadística.
    color: "text-primary", // Color del texto del icono.
  },
  {
    title: "Critical Path Tasks",
    value: "8",
    change: "2 at risk",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "On Schedule",
    value: "85%",
    change: "+5% from last week",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Avg. Completion",
    value: "63%",
    change: "+12% this month",
    icon: TrendingUp,
    color: "text-accent",
  },
]

// Definición del componente principal GanttChartView.
// Este componente proporciona una vista integral de la gestión de proyectos, incluyendo gráficos de Gantt, análisis de ruta crítica y una línea de tiempo.
export function GanttChartView() {
  // Estado para el proyecto seleccionado, inicializado en "all" para mostrar todos los proyectos.
  const [selectedProject, setSelectedProject] = useState("all")
  // Estado para el rango de tiempo seleccionado para la visualización, inicializado en "month".
  const [timeRange, setTimeRange] = useState("month")
  // Estado para la pestaña activa en la interfaz, inicializado en "gantt".
  const [activeTab, setActiveTab] = useState("gantt")

  return (
    <div className="space-y-6">
      {/* Encabezado de la página con título, descripción y botones de acción. */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Project Analytics & Gantt Charts</h1> {/* Título principal. */}
          <p className="text-muted-foreground text-pretty">
            Visualize project timelines, dependencies, and critical paths {/* Descripción. */}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Botón para exportar la línea de tiempo. */}
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Timeline
          </Button>
          {/* Botón para generar un informe. */}
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Sección de estadísticas (Stats Grid). */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Mapea las estadísticas para mostrarlas en tarjetas individuales. */}
        {ganttStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle> {/* Título de la estadística. */}
              <stat.icon className={`h-4 w-4 ${stat.color}`} /> {/* Icono dinámico con color. */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div> {/* Valor de la estadística. */}
              <p className="text-xs text-muted-foreground">{stat.change}</p> {/* Descripción del cambio. */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de controles (filtros de proyecto y rango de tiempo, y controles de línea de tiempo). */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {/* Selector de proyecto. */}
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Selector de rango de tiempo. */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Componente de controles de línea de tiempo. */}
        <TimelineControls />
      </div>

      {/* Contenido principal con pestañas para diferentes vistas (Gantt, Ruta Crítica, Línea de Tiempo). */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger> {/* Pestaña para el gráfico de Gantt. */}
          <TabsTrigger value="critical-path">Critical Path</TabsTrigger> {/* Pestaña para el análisis de ruta crítica. */}
          <TabsTrigger value="timeline">Timeline View</TabsTrigger> {/* Pestaña para la vista de línea de tiempo. */}
        </TabsList>

        {/* Contenido de la pestaña del gráfico de Gantt. */}
        <TabsContent value="gantt">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline - Gantt Chart</CardTitle> {/* Título de la tarjeta. */}
            </CardHeader>
            <CardContent>
              {/* Componente GanttChart con el proyecto seleccionado y el rango de tiempo. */}
              <GanttChart selectedProject={selectedProject} timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido de la pestaña de análisis de ruta crítica. */}
        <TabsContent value="critical-path">
          {/* Componente CriticalPathAnalysis con el proyecto seleccionado. */}
          <CriticalPathAnalysis selectedProject={selectedProject} />
        </TabsContent>

        {/* Contenido de la pestaña de vista de línea de tiempo. */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Overview</CardTitle> {/* Título de la tarjeta. */}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mapea los proyectos para mostrarlos en la vista de línea de tiempo. */}
                {mockProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{project.name}</h4> {/* Nombre del proyecto. */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {project.startDate} - {project.endDate} {/* Fechas de inicio y fin. */}
                        </span>
                        <Badge variant="outline">{project.status}</Badge> {/* Insignia de estado del proyecto. */}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{project.progress}%</div> {/* Porcentaje de progreso. */}
                      <div className="text-sm text-muted-foreground">Complete</div> {/* Etiqueta de completado. */}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
