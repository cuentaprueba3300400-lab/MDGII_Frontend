// Importaciones de componentes de UI de la biblioteca local. Estos componentes son reutilizables y estilizados con Tailwind CSS.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para mostrar contenido en tarjetas.
import { Badge } from "@/components/ui/badge" // Componente para etiquetas o indicadores de estado.
import { Progress } from "@/components/ui/progress" // Componente para barras de progreso.
import { Button } from "@/components/ui/button" // Componente de botón interactivo.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Componentes para navegación por pestañas.

// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { FolderKanban, CheckSquare, Users, Clock, AlertTriangle, Download, BarChart3 } from "lucide-react"

// Importaciones de componentes específicos del dashboard. Estos son sub-componentes que se renderizan dentro de DashboardOverview.
import { PerformanceCharts } from "./performance-charts" // Componente para mostrar gráficos de rendimiento.
import { TeamProductivity } from "./team-productivity" // Componente para mostrar métricas de productividad del equipo.
import { ProjectTimeline } from "./project-timeline" // Componente para visualizar la línea de tiempo de proyectos.

/**
 * Componente DashboardOverview.
 * Este componente actúa como el punto de entrada para la vista general del dashboard,
 * consolidando diversas métricas y funcionalidades clave para la gestión de proyectos.
 * Muestra estadísticas generales, proyectos recientes y permite navegar entre diferentes
 * secciones como rendimiento, analíticas de equipo y línea de tiempo de proyectos.
 */
export function DashboardOverview() {
  // Definición de datos estáticos para las estadísticas principales del dashboard.
  // Cada objeto representa una tarjeta de estadística con título, valor, cambio, icono y color.
  const stats = [
    {
      title: "Active Projects", // Título de la estadística.
      value: "12", // Valor actual.
      change: "+2 from last month", // Descripción del cambio respecto a un período anterior.
      icon: FolderKanban, // Icono asociado a la estadística (importado de lucide-react).
      color: "text-primary", // Clase de color para el icono.
    },
    {
      title: "Completed Tasks", // Título de la estadística.
      value: "248", // Valor actual.
      change: "+18% from last week", // Descripción del cambio respecto a un período anterior.
      icon: CheckSquare, // Icono asociado a la estadística.
      color: "text-accent", // Clase de color para el icono.
    },
    {
      title: "Team Members", // Título de la estadística.
      value: "24", // Valor actual.
      change: "+3 new members", // Descripción del cambio respecto a un período anterior.
      icon: Users, // Icono asociado a la estadística.
      color: "text-secondary", // Clase de color para el icono.
    },
    {
      title: "Overdue Tasks", // Título de la estadística.
      value: "7", // Valor actual.
      change: "-2 from yesterday", // Descripción del cambio respecto a un período anterior.
      icon: AlertTriangle, // Icono asociado a la estadística.
      color: "text-destructive", // Clase de color para el icono.
    },
  ]

  // Definición de datos estáticos para la sección de proyectos recientes.
  // Cada objeto representa un proyecto con nombre, estado, progreso, fecha de vencimiento y número de miembros del equipo.
  const recentProjects = [
    {
      name: "Website Redesign", // Nombre del proyecto.
      status: "In Progress", // Estado actual del proyecto.
      progress: 75, // Porcentaje de progreso.
      dueDate: "2024-01-15", // Fecha de vencimiento.
      team: 5, // Número de miembros del equipo.
    },
    {
      name: "Mobile App Development", // Nombre del proyecto.
      status: "Planning", // Estado actual del proyecto.
      progress: 25, // Porcentaje de progreso.
      dueDate: "2024-02-28", // Fecha de vencimiento.
      team: 8, // Número de miembros del equipo.
    },
    {
      name: "Marketing Campaign", // Nombre del proyecto.
      status: "Review", // Estado actual del proyecto.
      progress: 90, // Porcentaje de progreso.
      dueDate: "2024-01-10", // Fecha de vencimiento.
      team: 3, // Número de miembros del equipo.
    },
  ]

  return (
    <div className="space-y-6">
      {/* Encabezado del dashboard con mensaje de bienvenida y botones de acción. */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome back, John!</h1> {/* Mensaje de bienvenida personalizado. */}
          <p className="text-muted-foreground text-pretty">Here's what's happening with your projects today.</p> {/* Descripción del estado actual de los proyectos. */}
        </div>
        <div className="flex gap-2">
          {/* Botón para exportar reporte. */}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> {/* Icono de descarga para el botón de exportar. */}
            Export Report
          </Button>
          {/* Botón para generar reporte. */}
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" /> {/* Icono de gráfico de barras para el botón de generar. */}
            Generate Report
          </Button>
        </div>
      </div>

      {/* Grid de estadísticas. Mapea sobre el array `stats` para renderizar cada tarjeta de estadística. */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}> {/* Componente Card para cada estadística individual. */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle> {/* Título de la tarjeta de estadística. */}
              <stat.icon className={`h-4 w-4 ${stat.color}`} /> {/* Icono dinámico con color, basado en la propiedad 'icon' de cada estadística. */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div> {/* Valor principal de la estadística. */}
              <p className="text-xs text-muted-foreground">{stat.change}</p> {/* Descripción del cambio o tendencia de la estadística. */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Componente de pestañas para organizar diferentes secciones del dashboard. */}
      <Tabs defaultValue="overview" className="space-y-4">
        {/* Lista de pestañas navegables. */}
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger> {/* Pestaña para la vista general del dashboard. */}
          <TabsTrigger value="performance">Performance</TabsTrigger> {/* Pestaña para gráficos de rendimiento. */}
          <TabsTrigger value="team">Team Analytics</TabsTrigger> {/* Pestaña para analíticas de productividad del equipo. */}
          <TabsTrigger value="timeline">Timeline</TabsTrigger> {/* Pestaña para la línea de tiempo de proyectos. */}
        </TabsList>

        {/* Contenido de la pestaña "Overview". Muestra una sección de proyectos recientes. */}
        <TabsContent value="overview" className="space-y-4">
          {/* Sección de proyectos recientes. */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle> {/* Título de la sección de proyectos recientes. */}
              <CardDescription>Your most active projects and their current status</CardDescription> {/* Descripción de la sección. */}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mapea sobre el array `recentProjects` para renderizar cada proyecto individualmente. */}
                {recentProjects.map((project) => (
                  <div key={project.name} className="flex items-center justify-between space-x-4"> {/* Contenedor para cada proyecto. */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{project.name}</h4> {/* Nombre del proyecto. */}
                        {/* Badge que muestra el estado del proyecto con estilos condicionales basados en el estado. */}
                        <Badge
                          variant={
                            project.status === "In Progress"
                              ? "default"
                              : project.status === "Planning"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {/* Icono de reloj para indicar la fecha de vencimiento. */}
                          Due {project.dueDate} {/* Fecha de vencimiento del proyecto. */}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {/* Icono de usuarios para indicar el número de miembros del equipo. */}
                          {project.team} members {/* Número de miembros del equipo asignados al proyecto. */}
                        </div>
                      </div>
                      <Progress value={project.progress} className="h-2" /> {/* Barra de progreso visual del proyecto. */}
                    </div>
                    <div className="text-sm font-medium">{project.progress}%</div> {/* Porcentaje de progreso numérico. */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido de la pestaña "Performance". Renderiza el componente PerformanceCharts. */}
        <TabsContent value="performance">
          <PerformanceCharts />
        </TabsContent>

        {/* Contenido de la pestaña "Team Analytics". Renderiza el componente TeamProductivity. */}
        <TabsContent value="team">
          <TeamProductivity />
        </TabsContent>

        {/* Contenido de la pestaña "Timeline". Renderiza el componente ProjectTimeline. */}
        <TabsContent value="timeline">
          <ProjectTimeline />
        </TabsContent>
      </Tabs>
    </div>
  )
}
