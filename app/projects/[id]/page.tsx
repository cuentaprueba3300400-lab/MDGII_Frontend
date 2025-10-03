// Importa el componente DashboardLayout, que proporciona la estructura de diseño común para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente ProjectDetails, que muestra los detalles específicos de un proyecto.
import { ProjectDetails } from "@/components/projects/project-details"

// Define la interfaz para las propiedades del componente ProjectPage.
// `params` contiene los parámetros de la ruta dinámica, incluyendo el `id` del proyecto.
interface ProjectPageProps {
  params: {
    id: string // El ID del proyecto, obtenido de la URL.
  }
}

// Componente funcional ProjectPage.
// Este componente es responsable de renderizar la página de detalles de un proyecto específico.
// Recibe `params` como prop, que contiene el `id` del proyecto.
export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    // Utiliza DashboardLayout para mantener la coherencia en el diseño de la aplicación.
    <DashboardLayout>
      // Renderiza el componente ProjectDetails, pasándole el `projectId` extraído de los parámetros de la ruta.
      <ProjectDetails projectId={params.id} />
    </DashboardLayout>
  )
}
