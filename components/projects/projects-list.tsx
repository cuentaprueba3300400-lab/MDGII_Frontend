"use client"

/*
 * Componente ProjectsList
 * Este componente muestra una lista de proyectos, permitiendo a los usuarios buscar, filtrar y gestionar proyectos.
 * También incluye la funcionalidad para crear nuevos proyectos.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateProjectDialog } from "./create-project-dialog"
import { Plus, Search, Filter, Calendar, Users, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

/*
 * Datos simulados (Mock data) para la lista de proyectos.
 * En una aplicación real, estos datos se obtendrían de una API o un servicio de backend.
 */
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    status: "In Progress",
    priority: "High",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    teamMembers: 5,
    budget: 50000,
    manager: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    teamMembers: 8,
    budget: 120000,
    manager: "Mike Chen",
  },
  {
    id: "3",
    name: "Marketing Campaign Q1",
    description: "Digital marketing campaign for product launch",
    status: "Review",
    priority: "High",
    progress: 90,
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    teamMembers: 3,
    budget: 25000,
    manager: "Emily Davis",
  },
  {
    id: "4",
    name: "Infrastructure Upgrade",
    description: "Server migration and performance optimization",
    status: "Completed",
    priority: "Critical",
    progress: 100,
    startDate: "2023-11-01",
    endDate: "2023-12-20",
    teamMembers: 4,
    budget: 75000,
    manager: "Alex Rodriguez",
  },
]

export function ProjectsList() {
  /*
   * Estado para el término de búsqueda de proyectos.
   */
  const [searchTerm, setSearchTerm] = useState("")
  /*
   * Estado para el filtro de estado de proyectos.
   */
  const [statusFilter, setStatusFilter] = useState("all")
  /*
   * Estado para el filtro de prioridad de proyectos.
   */
  const [priorityFilter, setPriorityFilter] = useState("all")
  /*
   * Estado para controlar la visibilidad del diálogo de creación de proyectos.
   */
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  /*
   * Proyectos filtrados basados en el término de búsqueda, estado y prioridad.
   */
  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  /*
   * Función de utilidad para obtener el color de la insignia (badge) según el estado del proyecto.
   * @param status El estado del proyecto (e.g., "In Progress", "Planning", "Completed").
   * @returns Una cadena que representa la variante de color de la insignia.
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "default"
      case "Planning":
        return "secondary"
      case "Review":
        return "outline"
      case "Completed":
        return "default"
      default:
        return "secondary"
    }
  }

  /*
   * Función de utilidad para obtener el color de la insignia (badge) según la prioridad del proyecto.
   * @param priority La prioridad del proyecto (e.g., "Critical", "High", "Medium", "Low").
   * @returns Una cadena que representa la variante de color de la insignia.
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      /*
       * Sección del encabezado de la página de proyectos.
       * Contiene el título de la página y el botón para crear un nuevo proyecto.
       */
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Projects</h1>
          <p className="text-muted-foreground text-pretty">Manage and track all your projects in one place</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      /*
       * Sección de filtros para buscar y categorizar proyectos.
       * Incluye un campo de búsqueda, un filtro por estado y un filtro por prioridad.
       */
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      /*
       * Cuadrícula de proyectos.
       * Itera sobre los proyectos filtrados y muestra cada uno en una tarjeta.
       */
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
                  </div>
                </div>
                /*
                 * Menú desplegable de acciones para cada proyecto.
                 * Contiene opciones para ver detalles, editar y eliminar el proyecto.
                 */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-sm">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium">{project.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Team:</span>
                  <span className="font-medium">{project.teamMembers}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Manager:</span>
                    <span className="ml-1 font-medium">{project.manager}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/projects/${project.id}`}>View Project</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      /*
       * Mensaje que se muestra cuando no se encuentran proyectos que coincidan con los criterios de búsqueda/filtro.
       */
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}

      /*
       * Diálogo para crear un nuevo proyecto.
       * Se muestra cuando el usuario hace clic en el botón "New Project".
       */
      <CreateProjectDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
