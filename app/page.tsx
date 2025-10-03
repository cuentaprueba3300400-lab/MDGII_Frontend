"use client"

// Importaciones necesarias para el componente
// Importa el hook useState de React para manejar el estado local del componente.
import { useState } from "react"
// Importa el componente LoginForm, que maneja la lógica y UI del formulario de inicio de sesión.
import { LoginForm } from "@/components/auth/login-form"
// Importa el componente RegisterForm, que maneja la lógica y UI del formulario de registro.
import { RegisterForm } from "@/components/auth/register-form"
// Importa el componente Button de la biblioteca de UI, utilizado para acciones interactivas.
import { Button } from "@/components/ui/button"
// Importa varios componentes de Card (Card, CardContent, CardDescription, CardHeader, CardTitle)
// de la biblioteca de UI, utilizados para estructurar y presentar contenido de forma organizada.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Componente principal de la página de inicio (HomePage).
// Este componente actúa como el punto de entrada para la autenticación de usuarios, permitiendo
// alternar entre las vistas de inicio de sesión y registro.
export default function HomePage() {
  // Define un estado local `isLogin` utilizando `useState`.
  // `isLogin` es un booleano que controla qué formulario se muestra: true para LoginForm, false para RegisterForm.
  // Inicialmente, se muestra el formulario de inicio de sesión (true).
  const [isLogin, setIsLogin] = useState(true)

  return (
    // Contenedor principal de la página.
    // Ocupa toda la altura de la pantalla (`min-h-screen`), aplica un gradiente de fondo (`bg-gradient-to-br`),
    // centra su contenido (`flex items-center justify-center`) y añade un padding (`p-4`).
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      // Contenedor interno para el contenido de la tarjeta.
      // Establece un ancho completo (`w-full`), un ancho máximo (`max-w-md`) y espaciado vertical (`space-y-6`).
      <div className="w-full max-w-md space-y-6">
        // Sección del encabezado de la aplicación.
        // Contiene el título de la aplicación y una descripción, centrados y con espaciado vertical.
        <div className="text-center space-y-2">
          // Título principal de la aplicación, estilizado con tamaño de fuente grande y color primario.
          <h1 className="text-3xl font-bold text-primary">ProjectFlow</h1>
          // Descripción de la aplicación, con un color de texto silenciado.
          <p className="text-muted-foreground">Professional project management for modern teams</p>
        </div>

        // Componente Card que agrupa el formulario de autenticación.
        <Card>
          // Encabezado de la tarjeta.
          // Contiene el título y la descripción del formulario actual, que cambian dinámicamente según `isLogin`.
          <CardHeader className="space-y-1">
            // Título de la tarjeta, que muestra "Sign In" o "Create Account" según el estado.
            <CardTitle className="text-2xl text-center">{isLogin ? "Sign In" : "Create Account"}</CardTitle>
            // Descripción de la tarjeta, que proporciona contexto al usuario sobre el formulario actual.
            <CardDescription className="text-center">
              {isLogin
                ? "Enter your credentials to access your projects"
                : "Comienza tu viaje en la gestión de proyectos"}
            </CardDescription>
          </CardHeader>
          // Contenido principal de la tarjeta.
          // Renderiza condicionalmente el LoginForm o el RegisterForm basado en el estado `isLogin`.
          <CardContent>
            {isLogin ? <LoginForm /> : <RegisterForm />}

            // Sección para el botón de alternar entre formularios.
            // Centrado y con margen superior.
            <div className="mt-6 text-center">
              // Botón para cambiar entre el formulario de inicio de sesión y el de registro.
              // Utiliza la variante "ghost" para un estilo discreto y un `onClick` que invierte el estado `isLogin`.
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)} // Alterna el valor de `isLogin`.
                className="text-sm text-muted-foreground hover:text-primary"
              >
                // Texto del botón que cambia dinámicamente para indicar la acción opuesta al formulario actual.
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
