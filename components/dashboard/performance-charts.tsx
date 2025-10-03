// Habilita el modo cliente para este componente, lo que permite el uso de hooks y otras funcionalidades de React en el navegador.
"use client"

// Importaciones de componentes de UI de la biblioteca local. Estos componentes son reutilizables y estilizados con Tailwind CSS.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para mostrar contenido en tarjetas.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Componentes para selectores desplegables.
import { Badge } from "@/components/ui/badge" // Componente para etiquetas o indicadores de estado.

// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { TrendingUp, TrendingDown, Minus, Target, Clock, CheckCircle } from "lucide-react"

// Importaciones de componentes de gráficos de la librería recharts. Estos se utilizan para visualizar datos.
import {
  LineChart, // Componente principal para gráficos de línea.
  Line, // Representa una línea en el gráfico.
  XAxis, // Eje X del gráfico.
  YAxis, // Eje Y del gráfico.
  CartesianGrid, // Rejilla cartesiana para el fondo del gráfico.
  Tooltip, // Información emergente al pasar el ratón por los puntos del gráfico.
  ResponsiveContainer, // Contenedor que hace que el gráfico sea responsivo.
  PieChart, // Componente principal para gráficos de pastel.
  Pie, // Representa una sección en el gráfico de pastel.
  Cell, // Celda individual en el gráfico de pastel, utilizada para aplicar colores.
} from "recharts"

// Datos estáticos para el gráfico de tendencia de finalización de tareas.
// Incluye el mes, tareas completadas, tareas planificadas y eficiencia.
const performanceData = [
  { month: "Jul", completed: 45, planned: 50, efficiency: 90 },
  { month: "Aug", completed: 52, planned: 55, efficiency: 95 },
  { month: "Sep", completed: 48, planned: 60, efficiency: 80 },
  { month: "Oct", completed: 61, planned: 65, efficiency: 94 },
  { month: "Nov", completed: 55, planned: 58, efficiency: 95 },
  { month: "Dec", completed: 67, planned: 70, efficiency: 96 },
]

// Datos estáticos para la distribución del estado de los proyectos.
// Incluye el nombre del estado, el valor (porcentaje) y el color asociado.
const projectStatusData = [
  { name: "Completed", value: 45, color: "#22c55e" }, // Proyectos completados.
  { name: "In Progress", value: 30, color: "#3b82f6" }, // Proyectos en progreso.
  { name: "Planning", value: 15, color: "#f59e0b" }, // Proyectos en planificación.
  { name: "On Hold", value: 10, color: "#ef4444" }, // Proyectos en espera.
]

// Datos estáticos para la eficiencia del equipo.
// Incluye el nombre del equipo, su eficiencia, tareas totales y tareas completadas.
const teamEfficiencyData = [
  { team: "Frontend", efficiency: 92, tasks: 45, completed: 41 },
  { team: "Backend", efficiency: 88, tasks: 38, completed: 33 },
  { team: "Design", efficiency: 95, tasks: 28, completed: 27 },
  { team: "QA", efficiency: 90, tasks: 32, completed: 29 },
  { team: "DevOps", efficiency: 85, tasks: 22, completed: 19 },
]

/**
 * Componente PerformanceCharts.
 * Este componente muestra una serie de gráficos y métricas relacionadas con el rendimiento
 * de proyectos y equipos. Incluye KPIs, tendencias de finalización de tareas,
 * distribución del estado de proyectos y análisis de eficiencia por equipo.
 */
export function PerformanceCharts() {
  // Función auxiliar para determinar el icono de tendencia (arriba, abajo o sin cambios).
  // Compara el valor actual con el anterior para mostrar una flecha de tendencia y un color.
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" /> // Tendencia al alza (verde).
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" /> // Tendencia a la baja (rojo).
    return <Minus className="h-4 w-4 text-gray-500" /> // Sin cambios (gris).
  }

  // Función auxiliar para determinar el color del texto de eficiencia basado en su valor.
  // Proporciona una indicación visual rápida del nivel de eficiencia.
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600" // Alta eficiencia (verde oscuro).
    if (efficiency >= 80) return "text-yellow-600" // Eficiencia media (amarillo oscuro).
    return "text-red-600" // Baja eficiencia (rojo oscuro).
  }

  return (
    <div className="space-y-6">
      {/* Encabezado de la sección de analíticas de rendimiento. */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Analytics</h2> {/* Título principal de la sección. */}
        {/* Selector de período para filtrar los datos mostrados en los gráficos y KPIs. */}
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de Tarjetas de Indicadores Clave de Rendimiento (KPIs). */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta de Tasa de Entrega. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle> {/* Título del KPI. */}
            <Target className="h-4 w-4 text-muted-foreground" /> {/* Icono representativo del KPI. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div> {/* Valor actual del KPI. */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(94.2, 91.5)} {/* Icono de tendencia y color dinámico. */}
              <span>+2.7% from last month</span> {/* Descripción del cambio respecto al período anterior. */}
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Tiempo Promedio por Tarea. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Task Time</CardTitle> {/* Título del KPI. */}
            <Clock className="h-4 w-4 text-muted-foreground" /> {/* Icono representativo del KPI. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 days</div> {/* Valor actual del KPI. */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(2.1, 2.3)} {/* Icono de tendencia y color dinámico. */}
              <span>-0.2 days improvement</span> {/* Descripción del cambio respecto al período anterior. */}
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Puntuación de Calidad. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle> {/* Título del KPI. */}
            <CheckCircle className="h-4 w-4 text-muted-foreground" /> {/* Icono representativo del KPI. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7/10</div> {/* Valor actual del KPI. */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(8.7, 8.4)} {/* Icono de tendencia y color dinámico. */}
              <span>+0.3 points this month</span> {/* Descripción del cambio respecto al período anterior. */}
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Velocidad del Equipo. */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Velocity</CardTitle> {/* Título del KPI. */}
            <TrendingUp className="h-4 w-4 text-muted-foreground" /> {/* Icono representativo del KPI. */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67 pts</div> {/* Valor actual del KPI. */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(67, 61)} {/* Icono de tendencia y color dinámico. */}
              <span>+6 points this sprint</span> {/* Descripción del cambio respecto al período anterior. */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de gráficos: Tendencia de finalización de tareas y Distribución del estado de proyectos. */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Tendencia de Finalización de Tareas. */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle> {/* Título del gráfico. */}
            <CardDescription>Monthly completed vs planned tasks</CardDescription> {/* Descripción del gráfico. */}
          </CardHeader>
          <CardContent>
            {/* Contenedor responsivo para el gráfico de línea. */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}> {/* Componente LineChart con los datos de rendimiento. */}
                <CartesianGrid strokeDasharray="3 3" /> {/* Rejilla cartesiana para mejorar la legibilidad. */}
                <XAxis dataKey="month" /> {/* Eje X que muestra los meses. */}
                <YAxis /> {/* Eje Y que muestra los valores numéricos. */}
                <Tooltip /> {/* Tooltip que aparece al pasar el ratón sobre los puntos de datos. */}
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} name="Completed" /> {/* Línea que representa las tareas completadas (verde). */}
                <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} name="Planned" /> {/* Línea que representa las tareas planificadas (azul). */}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Distribución del Estado de Proyectos. */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle> {/* Título del gráfico. */}
            <CardDescription>Current status of all projects</CardDescription> {/* Descripción del gráfico. */}
          </CardHeader>
          <CardContent>
            {/* Contenedor responsivo para el gráfico de pastel. */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart> {/* Componente PieChart. */}
                <Pie
                  data={projectStatusData} // Datos para el gráfico de pastel.
                  cx="50%" // Posición central X del gráfico.
                  cy="50%" // Posición central Y del gráfico.
                  innerRadius={60} // Radio interior del anillo del pastel.
                  outerRadius={100} // Radio exterior del anillo del pastel.
                  paddingAngle={5} // Espacio entre las secciones del pastel.
                  dataKey="value" // La clave en los datos que representa el valor de cada sección.
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} /> // Renderiza cada sección del pastel con su color definido.
                  ))}
                </Pie>
                <Tooltip /> {/* Tooltip que aparece al pasar el ratón sobre las secciones del pastel. */}
              </PieChart>
            </ResponsiveContainer>
            {/* Leyenda del gráfico de pastel. */}
            <div className="flex flex-wrap gap-2 mt-4">
              {projectStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /> {/* Indicador visual del color de la sección. */}
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de Análisis de Eficiencia del Equipo. */}
      <Card>
        <CardHeader>
          <CardTitle>Team Efficiency Analysis</CardTitle> {/* Título de la sección. */}
          <CardDescription>Performance metrics by team</CardDescription> {/* Descripción de la sección. */}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamEfficiencyData.map((team) => (
              <div key={team.team} className="flex items-center justify-between p-4 border rounded-lg"> {/* Contenedor para cada equipo. */}
                <div className="space-y-1">
                  <h4 className="font-medium">{team.team} Team</h4> {/* Nombre del equipo. */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {team.completed}/{team.tasks} tasks completed
                    </span> {/* Muestra el número de tareas completadas y el total. */}
                    <Badge variant="outline">{team.efficiency}% efficiency</Badge> {/* Badge que muestra el porcentaje de eficiencia del equipo. */}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getEfficiencyColor(team.efficiency)}`}> {/* Porcentaje de eficiencia con color dinámico. */}
                    {team.efficiency}%
                  </div>
                  <div className="text-sm text-muted-foreground">Efficiency</div> {/* Etiqueta para el valor de eficiencia. */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
