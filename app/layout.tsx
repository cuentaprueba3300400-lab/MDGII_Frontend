// Importa el tipo React para el tipado de componentes.
import type React from "react"
// Importa el tipo Metadata de Next.js para la configuración de metadatos de la página.
import type { Metadata } from "next"
// Importa la fuente DM_Sans de Google Fonts para su uso en la aplicación.
import { DM_Sans } from "next/font/google"
// Importa la fuente GeistMono para su uso en la aplicación, probablemente para código o texto monoespaciado.
import { GeistMono } from "geist/font/mono"
// Importa el componente Analytics de Vercel para el seguimiento de análisis.
import { Analytics } from "@vercel/analytics/next"
// Importa Suspense de React para la carga perezosa de componentes y la gestión de estados de carga.
import { Suspense } from "react"
// Importa los estilos globales de la aplicación.
import "./globals.css"

// Configuración de la fuente DM Sans.
// Esta fuente se carga desde Google Fonts y se utiliza en toda la aplicación para mantener una consistencia visual.
// Se define como una variable CSS para ser fácilmente accesible en los estilos globales.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "700"],
})

// Metadatos de la aplicación para SEO y manifest.
// Esta información es crucial para cómo los motores de búsqueda indexan la aplicación
// y cómo se presenta en navegadores y dispositivos, por ejemplo, al añadir a la pantalla de inicio.
// Define el título de la página, la descripción y el generador.
export const metadata: Metadata = {
  title: "ProjectFlow - Project Management System",
  description: "Professional project management application with Gantt charts, task management, and team collaboration",
  generator: "v0.app",
}

// Componente RootLayout que envuelve toda la aplicación.
// Este es el componente de diseño raíz de Next.js, lo que significa que cualquier UI compartida entre páginas
// como la navegación, el pie de página o los proveedores de contexto se define aquí.
// Los `children` representan el contenido de la página actual que se está renderizando.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // El elemento HTML define el idioma de la página para accesibilidad y SEO.
    <html lang="en">
      // El elemento body aplica las fuentes configuradas DM Sans y Geist Mono a todo el cuerpo del documento.
      // Estas clases CSS `font-sans`, `dmSans.variable`, `GeistMono.variable` se inyectan globalmente.
      <body className={`font-sans ${dmSans.variable} ${GeistMono.variable}`}>
        // Suspense permite mostrar un fallback, en este caso, null, mientras los componentes hijos se cargan de forma asíncrona.
        // Esto es útil para la división de código y la carga perezosa de componentes.
        <Suspense fallback={null}>{children}</Suspense>
        // Analytics es un componente de Vercel para la recolección de datos de uso y rendimiento de la aplicación.
        // Ayuda a monitorear el comportamiento del usuario y el rendimiento de la aplicación en producción.
        <Analytics />
      </body>
    </html>
  )
}
