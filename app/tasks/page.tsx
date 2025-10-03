// Importa el componente DashboardLayout, que proporciona la estructura de diseño común para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente TasksManagement, que se encarga de la gestión y visualización de tareas.
import { TasksManagement } from "@/components/tasks/tasks-management"

// Componente funcional TasksPage.
// Este componente es responsable de renderizar la página de gestión de tareas.
export default function TasksPage() {
  return (
    // Utiliza DashboardLayout para mantener la coherencia en el diseño de la aplicación.
    <DashboardLayout>
      // Renderiza el componente TasksManagement, que se encarga de la lógica y la UI para la gestión de tareas.
      <TasksManagement />
    </DashboardLayout>
  )
}
