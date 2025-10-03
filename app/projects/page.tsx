// Importa el componente DashboardLayout, que proporciona la estructura de diseño común para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente ProjectsList, que muestra una lista de todos los proyectos.
import { ProjectsList } from "@/components/projects/projects-list"

// Componente funcional ProjectsPage.
// Este componente es responsable de renderizar la página que muestra la lista de proyectos.
export default function ProjectsPage() {
  return (
    // Utiliza DashboardLayout para mantener la coherencia en el diseño de la aplicación.
    <DashboardLayout>
      // Renderiza el componente ProjectsList, que se encarga de mostrar y gestionar la lista de proyectos.
      <ProjectsList />
    </DashboardLayout>
  )
}
