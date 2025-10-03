// Habilita el modo cliente para este componente.
"use client"

// Importaciones de componentes de UI de la biblioteca local.
import { Button } from "@/components/ui/button" // Componente de botón interactivo.

// Importaciones de iconos de la librería lucide-react. Estos iconos se utilizan para mejorar la interfaz visual.
import { ZoomIn, ZoomOut, RotateCcw, Play, Pause } from "lucide-react" // Iconos para funcionalidades de zoom, reset, reproducir y pausar.

// Definición del componente funcional TimelineControls.
// Este componente proporciona controles para interactuar con una línea de tiempo, como zoom, reset, y controles de reproducción.
export function TimelineControls() {
  return (
    <div className="flex items-center gap-2"> {/* Contenedor principal de los controles, con espaciado y alineación. */}
      {/* Botón para alejar (zoom out) la línea de tiempo. */}
      <Button variant="outline" size="sm">
        <ZoomOut className="h-4 w-4" />
      </Button>
      {/* Botón para acercar (zoom in) la línea de tiempo. */}
      <Button variant="outline" size="sm">
        <ZoomIn className="h-4 w-4" />
      </Button>
      {/* Botón para reiniciar la vista de la línea de tiempo. */}
      <Button variant="outline" size="sm">
        <RotateCcw className="h-4 w-4" />
      </Button>
      {/* Divisor visual entre los controles de zoom/reset y los controles de reproducción. */}
      <div className="w-px h-6 bg-border mx-2" />
      {/* Botón para iniciar la reproducción de la línea de tiempo. */}
      <Button variant="outline" size="sm">
        <Play className="h-4 w-4" />
      </Button>
      {/* Botón para pausar la reproducción de la línea de tiempo. */}
      <Button variant="outline" size="sm">
        <Pause className="h-4 w-4" />
      </Button>
    </div>
  )
}
