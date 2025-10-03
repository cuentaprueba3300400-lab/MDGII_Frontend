// Habilita el modo cliente para este componente, lo que permite el uso de hooks y otras funcionalidades de React en el navegador.
"use client"

// Importaciones de componentes de UI de la biblioteca local. Estos componentes son reutilizables y estilizados con Tailwind CSS.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para mostrar contenido en tarjetas.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Componentes para mostrar avatares de usuarios.
import { Badge } from "@/components/ui/badge" // Componente para etiquetas o indicadores de estado.
import { Progress } from "@/components/ui/progress" // Componente para barras de progreso.
import { Button } from "@/components/ui/button" // Componente de botón interactivo.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Componentes para selectores desplegables.

// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { Users, Clock, CheckSquare, Award, Target } from "lucide-react"

// Importaciones de componentes de gráficos de la librería recharts. Estos se utilizan para visualizar datos.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Datos estáticos que simulan la información de los miembros del equipo.
const teamMembers = [
  {
    id: "1", // Identificador único del miembro del equipo.
    name: "Sarah Johnson", // Nombre del miembro del equipo.
    role: "Project Manager", // Rol del miembro del equipo.
    avatar: "/placeholder.svg?height=40&width=40", // URL del avatar del miembro del equipo.
    tasksCompleted: 28, // Número de tareas completadas.
    tasksAssigned: 32, // Número total de tareas asignadas.
    efficiency: 87.5, // Porcentaje de eficiencia.
    hoursLogged: 156, // Horas registradas.
    status: "active", // Estado actual (e.g., 'active', 'busy', 'offline').
    currentProject: "Website Redesign", // Proyecto actual en el que está trabajando.
  },
  {
    id: "2",
    name: "John Doe",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 24,
    tasksAssigned: 26,
    efficiency: 92.3,
    hoursLogged: 142,
    status: "active",
    currentProject: "Mobile App",
  },
  {
    id: "3",
    name: "Jane Smith",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 31,
    tasksAssigned: 35,
    efficiency: 88.6,
    hoursLogged: 168,
    status: "active",
    currentProject: "Website Redesign",
  },
  {
    id: "4",
    name: "Mike Wilson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 22,
    tasksAssigned: 28,
    efficiency: 78.6,
    hoursLogged: 134,
    status: "busy",
    currentProject: "Mobile App",
  },
  {
    id: "5",
    name: "Lisa Chen",
    role: "QA Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 19,
    tasksAssigned: 21,
    efficiency: 90.5,
    hoursLogged: 128,
    status: "active",
    currentProject: "Marketing Campaign",
  },
]

// Datos estáticos para la productividad semanal.
const weeklyProductivity = [
  { week: "Week 1", tasks: 45, hours: 320 }, // Tareas completadas y horas registradas en la Semana 1.
  { week: "Week 2", tasks: 52, hours: 340 }, // Tareas completadas y horas registradas en la Semana 2.
  { week: "Week 3", tasks: 48, hours: 315 }, // Tareas completadas y horas registradas en la Semana 3.
  { week: "Week 4", tasks: 58, hours: 365 }, // Tareas completadas y horas registradas en la Semana 4.
]

// Datos estáticos para los miembros del equipo con mejor rendimiento.
const topPerformers = [
  { name: "John Doe", metric: "Efficiency", value: "92.3%", change: "+2.1%" }, // Mejor rendimiento en eficiencia.
  { name: "Lisa Chen", metric: "Quality Score", value: "9.2/10", change: "+0.5" }, // Mejor rendimiento en puntuación de calidad.
  { name: "Jane Smith", metric: "Task Velocity", value: "31 tasks", change: "+4" }, // Mejor rendimiento en velocidad de tareas.
]

// Definición del componente principal TeamProductivity.
// Este componente muestra métricas de productividad del equipo, rendimiento individual y gráficos.
export function TeamProductivity() {
  // Función auxiliar para obtener el color del indicador de estado del miembro del equipo.
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500" // Verde para estado activo.
      case "busy":
        return "bg-yellow-500" // Amarillo para estado ocupado.
      case "offline":
        return "bg-gray-400" // Gris para estado desconectado.
      default:
        return "bg-gray-400" // Gris por defecto.
    }
  }

  // Función auxiliar para obtener el color del texto de eficiencia basado en su valor.
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600" // Verde para alta eficiencia.
    if (efficiency >= 80) return "text-yellow-600" // Amarillo para eficiencia media.
    return "text-red-600" // Rojo para baja eficiencia.
  }

  return (
    <div className="space-y-6">
      {/* Encabezado de la sección de analíticas del equipo con título y controles de período/exportación. */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Team Analytics</h2> {/* Título de la sección. */}
        <div className="flex gap-2">
          {/* Selector para el período de tiempo (Esta Semana, Este Mes, Este Trimestre). */}
          <Select defaultValue="thismonth">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisweek">This Week</SelectItem>
              <SelectItem value="thismonth">This Month</SelectItem>
              <SelectItem value="thisquarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          {/* Botón para exportar el informe. */}
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas generales del equipo (KPIs). */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta de Miembros Activos. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle> {/* Título del KPI. */}
            <Users className="h-4 w-4 text-muted-foreground" /> {/* Icono de usuarios. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div> {/* Valor del KPI. */}
            <p className="text-xs text-muted-foreground">+2 new this month</p> {/* Descripción del cambio. */}
          </CardContent>
        </Card>

        {/* Tarjeta de Eficiencia Promedio. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Efficiency</CardTitle> {/* Título del KPI. */}
            <Target className="h-4 w-4 text-muted-foreground" /> {/* Icono de objetivo. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div> {/* Valor del KPI. */}
            <p className="text-xs text-muted-foreground">+3.2% from last month</p> {/* Descripción del cambio. */}
          </CardContent>
        </Card>

        {/* Tarjeta de Horas Totales Registradas. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle> {/* Título del KPI. */}
            <Clock className="h-4 w-4 text-muted-foreground" /> {/* Icono de reloj. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,340h</div> {/* Valor del KPI. */}
            <p className="text-xs text-muted-foreground">This month</p> {/* Período de tiempo. */}
          </CardContent>
        </Card>

        {/* Tarjeta de Tareas Completadas. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle> {/* Título del KPI. */}
            <CheckSquare className="h-4 w-4 text-muted-foreground" /> {/* Icono de verificación. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">203</div> {/* Valor del KPI. */}
            <p className="text-xs text-muted-foreground">+15% this month</p> {/* Descripción del cambio. */}
          </CardContent>
        </Card>
      </div>

      {/* Sección de gráficos: Productividad Semanal y Mejores Rendimientos. */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Productividad Semanal. */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Productivity</CardTitle> {/* Título del gráfico. */}
            <CardDescription>Tasks completed and hours logged per week</CardDescription> {/* Descripción del gráfico. */}
          </CardHeader>
          <CardContent>
            {/* Contenedor responsivo para el gráfico de barras. */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProductivity}> {/* Componente BarChart con los datos de productividad semanal. */}
                <CartesianGrid strokeDasharray="3 3" /> {/* Rejilla cartesiana. */}
                <XAxis dataKey="week" /> {/* Eje X mostrando las semanas. */}
                <YAxis /> {/* Eje Y. */}
                <Tooltip /> {/* Tooltip al pasar el ratón. */}
                <Bar dataKey="tasks" fill="#3b82f6" name="Tasks Completed" /> {/* Barra de tareas completadas. */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tarjeta de Mejores Rendimientos. */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" /> {/* Icono de premio. */}
              Top Performers
            </CardTitle>
            <CardDescription>Outstanding team members this month</CardDescription> {/* Descripción de la tarjeta. */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mapeo de los mejores rendimientos para mostrarlos individualmente. */}
              {topPerformers.map((performer, index) => (
                <div key={performer.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div> {/* Número de clasificación. */}
                    <div>
                      <p className="font-medium">{performer.name}</p> {/* Nombre del miembro. */}
                      <p className="text-sm text-muted-foreground">{performer.metric}</p> {/* Métrica de rendimiento. */}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{performer.value}</p> {/* Valor de la métrica. */}
                    <p className="text-sm text-green-600">{performer.change}</p> {/* Cambio en la métrica. */}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de Lista de Miembros del Equipo. */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members Performance</CardTitle> {/* Título de la sección. */}
          <CardDescription>Individual performance metrics and current assignments</CardDescription> {/* Descripción de la sección. */}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mapeo de los miembros del equipo para mostrar su rendimiento individual. */}
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                    /> {/* Indicador de estado del miembro del equipo. */}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{member.name}</h4> {/* Nombre del miembro. */}
                    <p className="text-sm text-muted-foreground">{member.role}</p> {/* Rol del miembro. */}
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {member.currentProject}
                      </Badge> {/* Proyecto actual del miembro. */}
                      <span className="text-xs text-muted-foreground">{member.hoursLogged}h logged</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium">{member.tasksCompleted}</span>
                      <span className="text-muted-foreground">/{member.tasksAssigned} tasks</span>
                    </div>
                    <div className={`text-sm font-semibold ${getEfficiencyColor(member.efficiency)}`}>
                      {member.efficiency}%
                    </div>
                  </div>
                  <Progress value={(member.tasksCompleted / member.tasksAssigned) * 100} className="w-24" /> {/* Barra de progreso de tareas. */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
