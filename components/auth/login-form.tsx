/*
 * Componente de formulario de inicio de sesión.
 * Este componente permite a los usuarios iniciar sesión en la aplicación
 * utilizando su correo electrónico y contraseña. Incluye manejo de estado
 * para los campos del formulario, visibilidad de la contraseña, estado de carga
 * y manejo de errores. También simula la autenticación para cuentas de demostración
 * internas y se conecta a una API de backend para la autenticación real.
 */

"use client"

// Importaciones de React y Next.js
import type React from "react"
import { useState } from "react" // Hook para manejar el estado dentro del componente
import { useRouter } from "next/navigation" // Hook de Next.js para la navegación programática

// Importaciones de componentes de UI personalizados
import { Button } from "@/components/ui/button" // Componente de botón estilizado
import { Input } from "@/components/ui/input" // Componente de campo de entrada estilizado
import { Label } from "@/components/ui/label" // Componente de etiqueta para campos de formulario
import { Alert, AlertDescription } from "@/components/ui/alert" // Componentes para mostrar mensajes de alerta

// Importaciones de iconos de Lucide React
import { Eye, EyeOff, Mail, Lock } from "lucide-react" // Iconos para visibilidad de contraseña, correo y candado

/**
 * Componente LoginForm.
 * Este componente funcional maneja la lógica y la interfaz de usuario
 * para el formulario de inicio de sesión.
 */
export function LoginForm() {
  // Estados para los campos del formulario y la UI
  const [email, setEmail] = useState("") // Estado para el valor del campo de correo electrónico
  const [password, setPassword] = useState("") // Estado para el valor del campo de contraseña
  const [showPassword, setShowPassword] = useState(false) // Estado para controlar la visibilidad de la contraseña
  const [isLoading, setIsLoading] = useState(false) // Estado para indicar si la solicitud de inicio de sesión está en curso
  const [error, setError] = useState("") // Estado para almacenar y mostrar mensajes de error
  const router = useRouter() // Inicializa el enrutador de Next.js para la navegación

  /**
   * Manejador de envío del formulario.
   * Esta función se ejecuta cuando el formulario de inicio de sesión es enviado.
   * Realiza la validación, simula la autenticación para usuarios de demostración
   * y, si no es un usuario de demostración, intenta autenticarse con la API de backend.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario (recarga de página)
    setIsLoading(true) // Establece el estado de carga a true
    setError("") // Limpia cualquier mensaje de error previo

    // --- 1. Simula la autenticación para cuentas de demostración internas ---
    // Este bloque de código permite probar la aplicación con usuarios predefinidos
    // sin necesidad de un backend activo. Es útil para el desarrollo y las demostraciones.
    const internalUsers = [
      {
        email: "admin@projectflow.com",
        password: "admin123",
        user: { id: 1, email: "admin@projectflow.com", first_name: "Admin", last_name: "User", role: { id: 1, name: "Admin", level: 1 } },
        token: "fake-admin-token",
      },
      {
        email: "planner@projectflow.com",
        password: "planner123",
        user: { id: 2, email: "planner@projectflow.com", first_name: "Planner", last_name: "User", role: { id: 2, name: "Planner", level: 2 } },
        token: "fake-planner-token",
      },
      {
        email: "viewer@projectflow.com",
        password: "viewer123",
        user: { id: 3, email: "viewer@projectflow.com", first_name: "Viewer", last_name: "User", role: { id: 3, name: "Viewer", level: 3 } },
        token: "fake-viewer-token",
      },
    ]

    // Busca si el correo y la contraseña coinciden con alguno de los usuarios internos
    const matchedInternalUser = internalUsers.find(
      (u) => u.email === email && u.password === password
    )

    if (matchedInternalUser) {
      // Si se encuentra un usuario interno, simula un retraso y guarda los datos en sessionStorage
      setTimeout(() => {
        sessionStorage.setItem("access_token", matchedInternalUser.token) // Guarda el token de acceso
        sessionStorage.setItem("user_data", JSON.stringify(matchedInternalUser.user)) // Guarda los datos del usuario
        router.push("/dashboard") // Redirige al usuario al panel de control
        setIsLoading(false) // Finaliza el estado de carga
      }, 1000) // Simula un retraso de 1 segundo
      return // Sale de la función después de la autenticación simulada
    }

    // --- 2. Intenta autenticarse con la API de backend ---
    // Si no es un usuario interno, se procede a intentar la autenticación con el servidor real.
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", { // Realiza una solicitud POST a la API de inicio de sesión
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Establece el tipo de contenido a JSON
        },
        body: JSON.stringify({ email, password }), // Envía el correo electrónico y la contraseña en el cuerpo de la solicitud
      })

      const data = await response.json() // Parsea la respuesta JSON de la API

      if (response.ok) {
        // Inicio de sesión en el backend exitoso
        sessionStorage.setItem("access_token", data.data.access_token) // Guarda el token de acceso recibido del backend
        sessionStorage.setItem("user_data", JSON.stringify(data.data.user)) // Guarda los datos del usuario recibido del backend
        router.push("/dashboard") // Redirige al usuario al panel de control
      } else {
        // Inicio de sesión en el backend fallido
        setError(data.detail || "Login failed. Please try again.") // Muestra un mensaje de error específico del backend o uno genérico
      }
    } catch (err) {
      // Captura errores de red o problemas de conexión con el servidor
      setError("Network error or server is unreachable. Please ensure the backend is running.") // Muestra un mensaje de error de conexión
      console.error("Login API error:", err) // Registra el error en la consola para depuración
    } finally {
      setIsLoading(false) // Asegura que el estado de carga se desactive al finalizar la solicitud
    }
  }

  // Renderizado del formulario de inicio de sesión
  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Formulario con manejador de envío y espaciado */} 
      {error && ( // Muestra una alerta de error si existe un mensaje de error
        <Alert variant="destructive"> {/* Alerta con estilo destructivo para errores */} 
          <AlertDescription>{error}</AlertDescription> {/* Descripción del error */} 
        </Alert>
      )}

      <div className="space-y-2"> {/* Contenedor para el campo de correo electrónico */} 
        <Label htmlFor="email">Email</Label> {/* Etiqueta para el campo de correo electrónico */} 
        <div className="relative"> {/* Contenedor relativo para posicionar el icono */} 
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de correo */} 
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2"> {/* Contenedor para el campo de contraseña */} 
        <Label htmlFor="password">Password</Label> {/* Etiqueta para el campo de contraseña */} 
        <div className="relative"> {/* Contenedor relativo para posicionar el icono y el botón de visibilidad */} 
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> {/* Icono de candado */} 
          <Input
            id="password"
            type={showPassword ? "text" : "password"} // Cambia el tipo de input basado en showPassword
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}> {/* Botón de envío del formulario */} 
        {isLoading ? "Signing in..." : "Sign In"} {/* Texto del botón cambia según el estado de carga */} 
      </Button>

      <div className="text-center"> {/* Contenedor para el enlace de "Olvidó su contraseña" */} 
        <Button variant="link" className="text-sm text-muted-foreground"> {/* Botón con estilo de enlace */} 
          Forgot your password?
        </Button>
      </div>
    </form>
  )
}