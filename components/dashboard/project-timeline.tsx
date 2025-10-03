// Habilita el modo cliente para este componente, lo que permite el uso de hooks y otras funcionalidades de React en el navegador.
"use client"

// Importaciones de componentes de UI de la biblioteca local. Estos componentes son reutilizables y estilizados con Tailwind CSS.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para mostrar contenido en tarjetas.
import { Badge } from "@/components/ui/badge" // Componente para etiquetas o indicadores de estado.
import { Button } from "@/components/ui/button" // Componente de botón interactivo.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Componentes para selectores desplegables.

// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { Calendar, Users, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

// Datos estáticos que simulan la información de proyectos para la línea de tiempo.
const timelineData = [
  {
    id: "1", // Identificador único del proyecto.
    project: "Website Redesign", // Nombre del proyecto.
    phase: "Development", // Fase actual del proyecto.
    startDate: "2024-01-01", // Fecha de inicio del proyecto.
    endDate: "2024-01-15", // Fecha de finalización prevista del proyecto.
    progress: 75, // Porcentaje de progreso del proyecto.
    status: "in-progress", // Estado actual del proyecto (e.g., 'in-progress', 'completed', 'planning').
    team: 5, // Número de miembros del equipo asignados al proyecto.
    milestones: [ // Hitos clave del proyecto.
      { name: "Research Complete", date: "2024-01-03", completed: true }, // Hito completado.
      { name: "Design Approved", date: "2024-01-08", completed: true }, // Hito completado.
      { name: "Development Complete", date: "2024-01-12", completed: false }, // Hito pendiente.
      { name: "Testing & Launch", date: "2024-01-15", completed: false }, // Hito pendiente.
    ],
    risks: ["Resource conflict on Jan 10"], // Riesgos identificados para el proyecto.
  },
  {
    id: "2",
    project: "Mobile App Development",
    phase: "Planning",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    progress: 25,
    status: "planning",
    team: 8,
    milestones: [
      { name: "Requirements Gathering", date: "2024-01-15", completed: false },
      { name: "Architecture Design", date: "2024-01-25", completed: false },
      { name: "Development Start", date: "2024-02-01", completed: false },
      { name: "Beta Release", date: "2024-02-28", completed: false },
    ],
    risks: [],
  },
  {
    id: "3",
    project: "Marketing Campaign",
    phase: "Review",
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    progress: 90,
    status: "review",
    team: 3,
    milestones: [
      { name: "Content Creation", date: "2023-12-20", completed: true },
      { name: "Design Assets", date: "2024-01-05", completed: true },
      { name: "Campaign Review", date: "2024-01-08", completed: true },
      { name: "Launch", date: "2024-01-10", completed: false },
    ],
    risks: [],
  },
]


// Datos estáticos para los próximos plazos o fechas límite.
const upcomingDeadlines = [
  { project: "Website Redesign", task: "Development Complete", date: "2024-01-12", daysLeft: 3, priority: "high" }, // Plazo de alta prioridad.
  { project: "Marketing Campaign", task: "Campaign Launch", date: "2024-01-10", daysLeft: 1, priority: "critical" }, // Plazo crítico.
  { project: "Mobile App", task: "Requirements Sign-off", date: "2024-01-15", daysLeft: 6, priority: "medium" }, // Plazo de prioridad media.
]


// Definición del componente principal ProjectTimeline.
// Este componente muestra una línea de tiempo de proyectos y próximos plazos.
export function ProjectTimeline() {
  // Función auxiliar para obtener el color de la insignia (Badge) según el estado del proyecto.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default" // Color por defecto para proyectos completados.
      case "in-progress":
        return "secondary" // Color secundario para proyectos en progreso.
      case "planning":
        return "outline" // Estilo de contorno para proyectos en planificación.
      case "review":
        return "outline" // Estilo de contorno para proyectos en revisión.
      default:
        return "secondary" // Color secundario por defecto.
    }
  }

  // Función auxiliar para obtener el color de la insignia (Badge) según la prioridad del plazo.
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive" // Color destructivo para prioridad crítica.
      case "high":
        return "default" // Color por defecto para prioridad alta.
      case "medium":
        return "secondary" // Color secundario para prioridad media.
      default:
        return "outline" // Estilo de contorno por defecto.
    }
  }

  // Función auxiliar para obtener el color del texto según los días restantes para un plazo.
  const getDaysLeftColor = (days: number) => {
    if (days <= 1) return "text-red-600" // Rojo para plazos muy cercanos.
    if (days <= 3) return "text-yellow-600" // Amarillo para plazos cercanos.
    return "text-green-600" // Verde para plazos con más tiempo.
  }

  return (
    <div className="space-y-6">
      // Encabezado de la sección de la línea de tiempo del proyecto con título y controles de filtrado/vista.
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Timeline</h2> /* Título de la sección. */
          <div className="flex gap-2">
          /* Selector para filtrar proyectos (Todos, Activos, Ruta Crítica). */
            <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="critical">Critical Path</SelectItem>
            </SelectContent>
          </Select>
          /* Botón para cambiar a la vista de calendario. */
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      /* Tarjeta de Próximos Plazos. */
      <Card>
        /* Encabezado de la tarjeta de Próximos Plazos. */
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" /> /* Icono de advertencia. */
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>Critical tasks and milestones requiring attention</CardDescription> {/* Descripción de la tarjeta. */}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            /* Mapeo de los plazos próximos para mostrarlos individualmente. */
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{deadline.task}</h4> {/* Nombre de la tarea del plazo. */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{deadline.project}</span> {/* Proyecto asociado al plazo. */}
                    <span>•</span>
                    <span>Due {deadline.date}</span> {/* Fecha de vencimiento del plazo. */}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(deadline.priority)} className="capitalize">
                    {deadline.priority}
                  </Badge> {/* Insignia de prioridad con color dinámico. */}
                  <span className={`text-sm font-medium ${getDaysLeftColor(deadline.daysLeft)}`}>
                    {deadline.daysLeft} days left
                  </span> {/* Días restantes con color dinámico. */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      /* Sección de Línea de Tiempo de Proyectos. */      <div className="space-y-4">
        /* Mapeo de los datos de la línea de tiempo para mostrar cada proyecto. */
        {timelineData.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.project}</CardTitle> {/* Título del proyecto. */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {/* Icono de calendario. */}
                      <span>
                        {project.startDate} - {project.endDate}
                      </span> {/* Rango de fechas del proyecto. */}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {/* Icono de usuarios. */}
                      <span>{project.team} members</span> {/* Número de miembros del equipo. */}
                    </div>
                    <Badge variant={getStatusColor(project.status)} className="capitalize">
                      {project.status.replace("-", " ")}
                    </Badge> {/* Insignia de estado del proyecto con color dinámico. */}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{project.progress}%</div> {/* Porcentaje de progreso. */}
                  <div className="text-sm text-muted-foreground">Complete</div> {/* Etiqueta de completado. */}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              /* Sección de Hitos. */
              <div>
                <h4 className="font-medium mb-3">Milestones</h4> {/* Título de la sección de hitos. */}
                <div className="space-y-2">
                  /* Mapeo de los hitos del proyecto. */
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {milestone.completed ? ( // Renderizado condicional basado en si el hito está completado.
                        <CheckCircle className="h-4 w-4 text-green-500" /> // Icono de verificación si está completado.
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" /> // Círculo vacío si no está completado.
                      )}
                      <div className="flex-1 flex items-center justify-between">
                        <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                          {milestone.name}
                        </span> {/* Nombre del hito, tachado si está completado. */}
                        <span className="text-sm text-muted-foreground">{milestone.date}</span> {/* Fecha del hito. */}
                      </div>
                      {index < project.milestones.length - 1 && ( // Flecha para separar hitos, excepto el último.
                        <ArrowRight className="h-3 w-3 text-muted-foreground ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              /* Sección de Riesgos. */
              {project.risks.length > 0 && ( // Renderiza la sección de riesgos solo si hay riesgos identificados.
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Identified Risks</h4> {/* Título de la sección de riesgos. */}
                  <div className="space-y-1">
                    {/* Mapeo de los riesgos identificados. */}
                    {project.risks.map((risk, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-red-500" /> {/* Icono de advertencia para cada riesgo. */}
                        <span className="text-red-600">{risk}</span> {/* Descripción del riesgo. */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
