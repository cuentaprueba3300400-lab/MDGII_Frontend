/*
 * Componente de formulario de registro.
 * Este componente permite a los usuarios registrarse en la aplicación
 * proporcionando sus datos personales, correo electrónico, contraseña,
 * rol y nombre de la empresa. Incluye manejo de estado para todos los campos
 * del formulario, visibilidad de las contraseñas, estado de carga y manejo de errores.
 * Actualmente, simula el proceso de registro y redirige al usuario al panel de control.
 */

"use client"

// Importaciones de React
import type React from "react"
import { useState } from "react" // Hook para manejar el estado dentro del componente

// Importaciones de componentes de UI personalizados
import { Button } from "@/components/ui/button" // Componente de botón estilizado
import { Input } from "@/components/ui/input" // Componente de campo de entrada estilizado
import { Label } from "@/components/ui/label" // Componente de etiqueta para campos de formulario
import { Alert, AlertDescription } from "@/components/ui/alert" // Componentes para mostrar mensajes de alerta
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Componentes para un campo de selección estilizado

// Importaciones de iconos de Lucide React
import { Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react" // Iconos para visibilidad de contraseña, correo, candado, usuario y edificio

/**
 * Componente RegisterForm.
 * Este componente funcional maneja la lógica y la interfaz de usuario
 * para el formulario de registro de nuevos usuarios.
 */
export function RegisterForm() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    firstName: "", // Nombre del usuario
    lastName: "", // Apellido del usuario
    email: "", // Correo electrónico del usuario
    password: "", // Contraseña del usuario
    confirmPassword: "", // Confirmación de la contraseña
    role: "", // Rol del usuario en la empresa
    company: "", // Nombre de la empresa del usuario
  })
  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false) // Controla la visibilidad de la contraseña principal
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // Controla la visibilidad de la confirmación de contraseña
  // Estados para la UI
  const [isLoading, setIsLoading] = useState(false) // Indica si la solicitud de registro está en curso
  const [error, setError] = useState("") // Almacena y muestra mensajes de error

  /**
   * Manejador de envío del formulario.
   * Esta función se ejecuta cuando el formulario de registro es enviado.
   * Realiza la validación de las contraseñas y simula un proceso de registro.
   * @param e El evento de formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario (recarga de página)
    setIsLoading(true) // Establece el estado de carga a true
    setError("") // Limpia cualquier mensaje de error previo

    // Validación: Comprueba si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden") // Establece un mensaje de error
      setIsLoading(false) // Finaliza el estado de carga
      return // Detiene la ejecución de la función
    }

    // Simulación de registro
    // En una aplicación real, aquí se realizaría una llamada a una API de backend
    // para enviar los datos de registro y manejar la respuesta del servidor.
    setTimeout(() => {
      // Redirige al usuario al panel de control después de un registro exitoso simulado
      window.location.href = "/dashboard"
      setIsLoading(false) // Finaliza el estado de carga
    }, 1000) // Simula un retraso de 1 segundo para el proceso de registro
  }

  /**
   * Función de utilidad para actualizar los datos del formulario.
   * @param field El nombre del campo a actualizar (ej. "email", "password").
   * @param value El nuevo valor para el campo.
   */
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value })) // Actualiza el estado del formulario manteniendo los valores existentes
  }

  // Renderizado del formulario de registro
  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Formulario con manejador de envío y espaciado */}
      {error && ( // Muestra una alerta de error si existe un mensaje de error
        <Alert variant="destructive"> {/* Alerta con estilo destructivo para errores */}
          <AlertDescription>{error}</AlertDescription> {/* Descripción del error */}
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4"> {/* Contenedor para los campos de nombre y apellido, organizados en una cuadrícula */}
        <div className="space-y-2"> {/* Contenedor para el campo de nombre */}
          <Label htmlFor="firstName">Nombre</Label> {/* Etiqueta para el campo de nombre */}
          <div className="relative"> {/* Contenedor relativo para posicionar el icono */}
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de usuario */}
            <Input
              id="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2"> {/* Contenedor para el campo de apellido */}
          <Label htmlFor="lastName">Apellido</Label> {/* Etiqueta para el campo de apellido */}
          <Input
            id="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2"> {/* Contenedor para el campo de correo electrónico */}
        <Label htmlFor="email">Correo Electrónico</Label> {/* Etiqueta para el campo de correo electrónico */}
        <div className="relative"> {/* Contenedor relativo para posicionar el icono */}
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de correo */}
          <Input
            id="email"
            type="email"
            placeholder="Introduce tu correo electrónico"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2"> {/* Contenedor para el campo de selección de rol */}
        <Label htmlFor="role">Rol</Label> {/* Etiqueta para el campo de rol */}
        <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}> {/* Componente Select para elegir el rol */}
          <SelectTrigger> {/* Disparador del Select */}
            <SelectValue placeholder="Selecciona tu rol" /> {/* Valor mostrado por defecto */}
          </SelectTrigger>
          <SelectContent> {/* Contenido del Select con las opciones de rol */}
            <SelectItem value="project-manager">Gerente de Proyecto</SelectItem>
            <SelectItem value="team-lead">Líder de Equipo</SelectItem>
            <SelectItem value="developer">Desarrollador</SelectItem>
            <SelectItem value="designer">Diseñador</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2"> {/* Contenedor para el campo de empresa */}
        <Label htmlFor="company">Empresa</Label> {/* Etiqueta para el campo de empresa */}
        <div className="relative"> {/* Contenedor relativo para posicionar el icono */}
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de edificio */}
          <Input
            id="company"
            placeholder="Nombre de la empresa"
            value={formData.company}
            onChange={(e) => updateFormData("company", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2"> {/* Contenedor para el campo de contraseña */}
        <Label htmlFor="password">Contraseña</Label> {/* Etiqueta para el campo de contraseña */}
        <div className="relative"> {/* Contenedor relativo para posicionar el icono y el botón de visibilidad */}
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de candado */}
          <Input
            id="password"
            type={showPassword ? "text" : "password"} // Cambia el tipo de input basado en showPassword
            placeholder="Crea una contraseña"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad de la contraseña
          >
            {showPassword ? ( // Muestra el icono de ojo abierto o cerrado según showPassword
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : ( // Icono de ojo cerrado
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2"> {/* Contenedor para el campo de confirmación de contraseña */}
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label> {/* Etiqueta para el campo de confirmación de contraseña */}
        <div className="relative"> {/* Contenedor relativo para posicionar el icono y el botón de visibilidad */}
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de candado */}
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"} // Cambia el tipo de input basado en showConfirmPassword
            placeholder="Confirma tu contraseña"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Alterna la visibilidad de la confirmación de contraseña
          >
            {showConfirmPassword ? ( // Muestra el icono de ojo abierto o cerrado según showConfirmPassword
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : ( // Icono de ojo cerrado
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}> {/* Botón de envío del formulario */}
        {isLoading ? "Registrando Personal..." : "Registrar Personal"} {/* Texto del botón cambia según el estado de carga */}
      </Button>
    </form>
  )
}
