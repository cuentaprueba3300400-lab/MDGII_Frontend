// Habilita el modo cliente para este componente, lo que permite el uso de hooks y otras funcionalidades de React en el navegador.
"use client"

// Importaciones de componentes de UI de la biblioteca local. Estos componentes son reutilizables y estilizados con Tailwind CSS.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para mostrar contenido en tarjetas.
import { Badge } from "@/components/ui/badge" // Componente para etiquetas o indicadores de estado.
import { Progress } from "@/components/ui/progress" // Componente para barras de progreso.
// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { AlertTriangle, Clock, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

// Define la interfaz para las propiedades del componente CriticalPathAnalysis.
interface CriticalPathAnalysisProps {
  selectedProject: string // Propiedad para el proyecto seleccionado, que determina qué datos mostrar.
}

// Datos estáticos que simulan la información del análisis de ruta crítica para diferentes proyectos.
const criticalPathData = {
  // Datos para un proyecto específico (ID: "1").
  "1": {
    projectName: "Website Redesign", // Nombre del proyecto.
    totalDuration: 15, // Duración total de la ruta crítica en días.
    criticalPath: [ // Array de tareas en la ruta crítica.
      {
        id: "1", // Identificador único de la tarea.
        name: "User Research & Analysis", // Nombre de la tarea.
        duration: 3, // Duración de la tarea en días.
        startDate: "2024-01-01", // Fecha de inicio de la tarea.
        endDate: "2024-01-03", // Fecha de finalización de la tarea.
        status: "completed", // Estado actual de la tarea (e.g., 'completed', 'in-progress', 'pending').
        risk: "low", // Nivel de riesgo asociado a la tarea.
      },
      {
        id: "2",
        name: "Wireframe Creation",
        duration: 2,
        startDate: "2024-01-03",
        endDate: "2024-01-05",
        status: "completed",
        risk: "low",
      },
      {
        id: "3",
        name: "Design System Setup",
        duration: 3,
        startDate: "2024-01-05",
        endDate: "2024-01-08",
        status: "in-progress",
        risk: "medium",
      },
      {
        id: "4",
        name: "Homepage Development",
        duration: 4,
        startDate: "2024-01-08",
        endDate: "2024-01-12",
        status: "in-progress",
        risk: "high",
      },
      {
        id: "6",
        name: "Testing & QA",
        duration: 3,
        startDate: "2024-01-12",
        endDate: "2024-01-15",
        status: "pending",
        risk: "medium",
      },
    ],
    risks: [ // Array de riesgos identificados para el proyecto.
      {
        task: "Homepage Development", // Tarea asociada al riesgo.
        issue: "Resource allocation conflict", // Descripción del problema.
        impact: "2 days delay", // Impacto del riesgo.
        mitigation: "Assign additional developer", // Estrategia de mitigación.
      },
      {
        task: "Design System Setup",
        issue: "Dependency on external library",
        impact: "1 day delay",
        mitigation: "Prepare fallback solution",
      },
    ],
  },
  // Datos para todos los proyectos combinados.
  all: {
    projectName: "All Projects",
    totalDuration: 45,
    criticalPath: [
      {
        id: "1",
        name: "Website Redesign - Critical Path",
        duration: 15,
        startDate: "2024-01-01",
        endDate: "2024-01-15",
        status: "in-progress",
        risk: "medium",
      },
      {
        id: "7",
        name: "Mobile App - Architecture",
        duration: 5,
        startDate: "2024-01-10",
        endDate: "2024-01-15",
        status: "in-progress",
        risk: "high",
      },
    ],
    risks: [
      {
        task: "Cross-project Resource Sharing",
        issue: "Team members allocated to multiple projects",
        impact: "3-5 days delay across projects",
        mitigation: "Prioritize critical path tasks",
      },
    ],
  },
}

// Definición del componente principal CriticalPathAnalysis.
// Este componente muestra un análisis detallado de la ruta crítica de un proyecto, incluyendo duración, progreso y riesgos.
export function CriticalPathAnalysis({ selectedProject }: CriticalPathAnalysisProps) {
  // Selecciona los datos del proyecto basándose en `selectedProject` o usa los datos del proyecto "1" por defecto.
  const data = criticalPathData[selectedProject as keyof typeof criticalPathData] || criticalPathData["1"]

  // Función auxiliar para obtener el color de la insignia de riesgo basado en el nivel de riesgo.
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive" // Rojo para riesgo alto.
      case "medium":
        return "secondary" // Color secundario para riesgo medio.
      case "low":
        return "outline" // Contorno para riesgo bajo.
      default:
        return "outline" // Contorno por defecto.
    }
  }

  // Función auxiliar para obtener el icono de estado de la tarea.
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" /> // Icono de verificación para tareas completadas.
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" /> // Icono de reloj para tareas en progreso.
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" /> // Icono de reloj gris para tareas pendientes.
      default:
        return <Clock className="h-4 w-4 text-gray-400" /> // Icono de reloj gris por defecto.
    }
  }

  // Calcula el número de tareas completadas y el porcentaje de progreso.
  const completedTasks = data.criticalPath.filter((task) => task.status === "completed").length
  const progressPercentage = (completedTasks / data.criticalPath.length) * 100

  return (
    <div className="space-y-6">
      {/* Sección de tarjetas de resumen (Overview Cards). */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Tarjeta de Duración de la Ruta Crítica. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Path Duration</CardTitle> {/* Título de la tarjeta. */}
            <Clock className="h-4 w-4 text-muted-foreground" /> {/* Icono de reloj. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalDuration} days</div> {/* Duración total. */}
            <p className="text-xs text-muted-foreground">Total project timeline</p> {/* Descripción. */}
          </CardContent>
        </Card>

        {/* Tarjeta de Progreso de la Ruta Crítica. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Path Progress</CardTitle> {/* Título de la tarjeta. */}
            <TrendingUp className="h-4 w-4 text-muted-foreground" /> {/* Icono de tendencia. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div> {/* Porcentaje de progreso. */}
            <Progress value={progressPercentage} className="mt-2" /> {/* Barra de progreso. */}
          </CardContent>
        </Card>

        {/* Tarjeta de Nivel de Riesgo. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle> {/* Título de la tarjeta. */}
            <AlertTriangle className="h-4 w-4 text-destructive" /> {/* Icono de alerta de riesgo. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Medium</div> {/* Nivel de riesgo. */}
            <p className="text-xs text-muted-foreground">{data.risks.length} identified risks</p> {/* Número de riesgos identificados. */}
          </CardContent>
        </Card>
      </div>

      {/* Sección de Visualización de la Ruta Crítica. */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Path - {data.projectName}</CardTitle> {/* Título de la sección con el nombre del proyecto. */}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mapea las tareas de la ruta crítica para mostrarlas. */}
            {data.criticalPath.map((task, index) => (
              <div key={task.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)} {/* Icono de estado de la tarea. */}
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1} {/* Número de orden de la tarea. */}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{task.name}</h4> {/* Nombre de la tarea. */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {task.startDate} - {task.endDate} {/* Fechas de inicio y fin. */}
                        </span>
                        <span>•</span>
                        <span>{task.duration} days</span> {/* Duración de la tarea. */}
                      </div>
                    </div>
                    <Badge variant={getRiskColor(task.risk)} className="capitalize">
                      {task.risk} Risk {/* Insignia de riesgo. */}
                    </Badge>
                  </div>
                </div>

                {/* Muestra una flecha si no es la última tarea para indicar la secuencia. */}
                {index < data.criticalPath.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sección de Análisis y Mitigación de Riesgos. */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" /> {/* Icono de alerta de riesgo. */}
            Risk Analysis & Mitigation {/* Título de la sección. */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mapea los riesgos identificados para mostrarlos. */}
            {data.risks.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-destructive">{risk.task}</h4> {/* Tarea asociada al riesgo. */}
                  <Badge variant="destructive">High Impact</Badge> {/* Insignia de impacto alto. */}
                </div>
                <div className="grid gap-2 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Issue: </span>
                    <span>{risk.issue}</span> {/* Descripción del problema. */}
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Impact: </span>
                    <span className="text-destructive">{risk.impact}</span> {/* Impacto del riesgo. */}
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Mitigation: </span>
                    <span className="text-green-600">{risk.mitigation}</span> {/* Estrategia de mitigación. */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
