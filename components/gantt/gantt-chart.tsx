// Habilita el modo cliente para este componente, lo que permite el uso de hooks y otras funcionalidades de React en el navegador.
"use client"

// Importaciones de React y componentes de UI de la biblioteca local.
import { useMemo } from "react" // Hook para memorizar valores y evitar recálculos innecesarios.
import { Badge } from "@/components/ui/badge" // Componente para mostrar etiquetas o indicadores de estado.

// Interfaz que define las propiedades esperadas por el componente GanttChart.
interface GanttChartProps {
  selectedProject: string // El ID del proyecto seleccionado para filtrar las tareas.
  timeRange: string // El rango de tiempo para la visualización del gráfico (ej. "week", "month").
}

// Datos estáticos que simulan una lista de tareas para diferentes proyectos.
const mockTasks = [
  {
    id: "1", // Identificador único de la tarea.
    name: "User Research & Analysis", // Nombre de la tarea.
    project: "Website Redesign", // Nombre del proyecto al que pertenece la tarea.
    projectId: "1", // ID del proyecto al que pertenece la tarea.
    startDate: "2024-01-01", // Fecha de inicio de la tarea.
    endDate: "2024-01-03", // Fecha de finalización de la tarea.
    progress: 100, // Porcentaje de progreso de la tarea.
    dependencies: [], // Array de IDs de tareas de las que depende esta tarea.
    assignee: "John Doe", // Persona asignada a la tarea.
    priority: "high", // Prioridad de la tarea (ej. "high", "medium").
    status: "completed", // Estado actual de la tarea (ej. "completed", "in-progress").
  },
  {
    id: "2",
    name: "Wireframe Creation",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-03",
    endDate: "2024-01-05",
    progress: 100,
    dependencies: ["1"],
    assignee: "John Doe",
    priority: "high",
    status: "completed",
  },
  {
    id: "3",
    name: "Design System Setup",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-05",
    endDate: "2024-01-08",
    progress: 75,
    dependencies: ["2"],
    assignee: "John Doe",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Homepage Development",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    progress: 40,
    dependencies: ["3"],
    assignee: "Jane Smith",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "5",
    name: "Backend Integration",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    progress: 0,
    dependencies: ["4"],
    assignee: "Mike Wilson",
    priority: "critical",
    status: "pending",
  },
  {
    id: "6",
    name: "Testing & QA",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-12",
    endDate: "2024-01-15",
    progress: 0,
    dependencies: ["4", "5"],
    assignee: "Lisa Chen",
    priority: "high",
    status: "pending",
  },
  {
    id: "7",
    name: "App Architecture",
    project: "Mobile App Development",
    projectId: "2",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    progress: 60,
    dependencies: [],
    assignee: "Mike Wilson",
    priority: "critical",
    status: "in-progress",
  },
  {
    id: "8",
    name: "UI Components",
    project: "Mobile App Development",
    projectId: "2",
    startDate: "2024-01-15",
    endDate: "2024-01-25",
    progress: 20,
    dependencies: ["7"],
    assignee: "Jane Smith",
    priority: "high",
    status: "in-progress",
  },
]

// Definición del componente GanttChart.
// Este componente visualiza las tareas del proyecto en un formato de gráfico de Gantt, permitiendo filtrar por proyecto y rango de tiempo.
export function GanttChart({ selectedProject, timeRange }: GanttChartProps) {
  // Filtra las tareas basándose en el proyecto seleccionado.
  const filteredTasks = useMemo(() => {
    if (selectedProject === "all") return mockTasks // Si se selecciona "all", devuelve todas las tareas.
    return mockTasks.filter((task) => task.projectId === selectedProject) // Filtra por el ID del proyecto.
  }, [selectedProject]) // Se recalcula solo cuando `selectedProject` cambia.

  // Genera un rango de fechas para la línea de tiempo del gráfico.
  const dateRange = useMemo(() => {
    const start = new Date("2024-01-01") // Fecha de inicio fija para el rango.
    const end = new Date("2024-01-31") // Fecha de fin fija para el rango.
    const dates = [] // Array para almacenar las fechas.
    const current = new Date(start) // Variable para iterar a través de las fechas.

    while (current <= end) {
      dates.push(new Date(current)) // Añade la fecha actual al array.
      current.setDate(current.getDate() + 1) // Incrementa la fecha en un día.
    }
    return dates
  }, []) // Se calcula una sola vez ya que las dependencias están vacías.

  // Calcula la posición y el ancho de la barra de una tarea en el gráfico de Gantt.
  const getTaskPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate) // Convierte la fecha de inicio a objeto Date.
    const end = new Date(endDate) // Convierte la fecha de fin a objeto Date.
    const rangeStart = new Date("2024-01-01") // Inicio del rango total de la línea de tiempo.
    const rangeEnd = new Date("2024-01-31") // Fin del rango total de la línea de tiempo.

    // Calcula el número total de días en el rango de la línea de tiempo.
    const totalDays = (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)
    // Calcula el desplazamiento de la tarea desde el inicio del rango.
    const startOffset = (start.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)
    // Calcula la duración de la tarea en días.
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    return {
      left: `${(startOffset / totalDays) * 100}%`, // Posición izquierda de la barra de la tarea.
      width: `${(duration / totalDays) * 100}%`, // Ancho de la barra de la tarea.
    }
  }

  // Devuelve la clase CSS de color basada en el estado de la tarea.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-primary"
      case "pending":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  // Devuelve la clase CSS de color del borde basada en la prioridad de la tarea.
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-l-destructive"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-400"
    }
  }

  return (
    <div className="space-y-4">
      {/* Encabezado de la línea de tiempo que muestra los nombres de las tareas y las fechas. */}
      <div className="flex">
        <div className="w-80 flex-shrink-0 p-4 font-medium border-r">Task Name</div> {/* Columna para el nombre de la tarea. */}
        <div className="flex-1 relative">
          <div className="flex border-b">
            {/* Mapea el rango de fechas para mostrar las cabeceras de las columnas de fecha. */}
            {dateRange
              .filter((_, index) => index % 2 === 0) // Filtra para mostrar solo cada dos días para evitar saturación.
              .map((date) => (
                <div key={date.toISOString()} className="flex-1 p-2 text-center text-sm border-r">
                  {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} {/* Formato de fecha corto. */}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Sección de tareas, donde se renderiza cada tarea como una barra en el gráfico de Gantt. */}
      <div className="space-y-1">
        {/* Mapea las tareas filtradas para mostrarlas. */}
        {filteredTasks.map((task) => (
          <div key={task.id} className="flex items-center hover:bg-muted/50 rounded">
            {/* Contenedor de la información de la tarea (nombre, asignado, estado). */}
            <div className={`w-80 flex-shrink-0 p-4 border-r border-l-4 ${getPriorityColor(task.priority)}`}> {/* Borde izquierdo con color de prioridad. */}
              <div className="space-y-1">
                <div className="font-medium text-sm">{task.name}</div> {/* Nombre de la tarea. */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {task.assignee} {/* Insignia con el nombre del asignado. */}
                  </Badge>
                  <Badge
                    variant={
                      task.status === "completed" ? "default" : task.status === "in-progress" ? "secondary" : "outline"
                    } // Variante de la insignia según el estado.
                    className="text-xs"
                  >
                    {task.status.replace("-", " ")} {/* Estado de la tarea, con guiones reemplazados por espacios. */}
                  </Badge>
                </div>
              </div>
            </div>
            {/* Barra de progreso de la tarea en el gráfico de Gantt. */}
            <div className="flex-1 relative h-16 p-2">
              <div
                className={`absolute top-2 h-8 rounded ${getStatusColor(task.status)} flex items-center px-2 shadow-sm`}
                style={getTaskPosition(task.startDate, task.endDate)} // Estilo dinámico para posicionar y dimensionar la barra.
              >
                <div className="text-white text-xs font-medium truncate">{task.progress}%</div> {/* Porcentaje de progreso. */}
                {task.progress > 0 && task.progress < 100 && ( // Muestra el progreso visual si la tarea no está completa ni sin empezar.
                  <div className="absolute inset-0 rounded overflow-hidden">
                    <div
                      className="h-full bg-white/20"
                      style={{ width: `${100 - task.progress}%`, marginLeft: `${task.progress}%` }}
                    /> {/* Barra de progreso visual. */}
                  </div>
                )}
              </div>
              {/* Las líneas de dependencia se dibujarían aquí en una implementación real. */}
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda del gráfico de Gantt, explicando los colores de estado y prioridad. */}
      <div className="flex items-center gap-6 pt-4 border-t text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>Completed</span> {/* Leyenda para tareas completadas. */}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span>In Progress</span> {/* Leyenda para tareas en progreso. */}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded" />
          <span>Pending</span> {/* Leyenda para tareas pendientes. */}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 border-l-4 border-l-destructive" />
          <span>Critical Priority</span> {/* Leyenda para prioridad crítica. */}
        </div>
      </div>
    </div>
  )
}
