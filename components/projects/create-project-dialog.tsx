// Habilita el modo cliente para este componente, lo que permite el uso de hooks y características interactivas.
"use client"

/**
 * Importaciones de React y hooks necesarios para el componente.
 */
import type React from "react"
import { useState } from "react"

/**
 * Importaciones de componentes de la interfaz de usuario de shadcn/ui.
 * - Button: Componente de botón interactivo.
 * - Dialog y sus variantes: Componentes para crear diálogos modales.
 * - Input: Componente de entrada de texto.
 * - Label: Componente de etiqueta para elementos de formulario.
 * - Textarea: Componente de área de texto multilínea.
 * - Select y sus variantes: Componentes para menús desplegables.
 * - Calendar y Popover: Componentes para selección de fechas.
 * - Iconos de lucide-react.
 * - Utilidades de formateo de fechas (date-fns) y estilos (cn).
 */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

/**
 * Interfaz que define las propiedades del componente CreateProjectDialog.
 * - open: Indica si el diálogo está abierto.
 * - onOpenChange: Función para manejar cambios en el estado de apertura del diálogo.
 */
interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Componente funcional CreateProjectDialog.
 * Permite a los usuarios crear un nuevo proyecto mediante un formulario en un diálogo modal.
 * Incluye campos para nombre, descripción, prioridad, gestor, presupuesto y fechas de inicio/fin.
 */
export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    manager: "",
    budget: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  })

  // Estado para manejar el estado de carga durante el envío del formulario
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Maneja el envío del formulario.
   * - Previene el comportamiento por defecto del formulario.
   * - Simula la creación de un proyecto con un timeout.
   * - Resetea el formulario después de la "creación".
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simula la creación del proyecto
    setTimeout(() => {
      console.log("Creating project:", formData)
      setIsLoading(false)
      onOpenChange(false)
      // Resetea el formulario
      setFormData({
        name: "",
        description: "",
        priority: "",
        manager: "",
        budget: "",
        startDate: undefined,
        endDate: undefined,
      })
    }, 1000)
  }

  /**
   * Actualiza los datos del formulario cuando cambia un campo.
   * @param field - Nombre del campo a actualizar.
   * @param value - Nuevo valor del campo.
   */
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new project with all the necessary details to get your team started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          /* Sección de nombre y prioridad del proyecto */
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => updateFormData("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          /* Sección de descripción del proyecto */
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the project goals and objectives"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              rows={3}
            />
          </div>

          /* Sección de gestor y presupuesto del proyecto */
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manager">Project Manager</Label>
              <Select value={formData.manager} onValueChange={(value) => updateFormData("manager", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="mike-chen">Mike Chen</SelectItem>
                  <SelectItem value="emily-davis">Emily Davis</SelectItem>
                  <SelectItem value="alex-rodriguez">Alex Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="0"
                value={formData.budget}
                onChange={(e) => updateFormData("budget", e.target.value)}
              />
            </div>
          </div>

          /* Sección de fechas de inicio y fin del proyecto */
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => updateFormData("startDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => updateFormData("endDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          /* Pie del diálogo con botones de acción */
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
