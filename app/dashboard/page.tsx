// Importa el componente DashboardLayout desde la ruta especificada.
// Este componente proporciona la estructura de diseño general para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente DashboardOverview desde la ruta especificada.
// Este componente es el contenido principal de la página del dashboard, mostrando una visión general.
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

// Define el componente funcional DashboardPage.
// Este componente representa la página principal del dashboard de la aplicación.
export default function DashboardPage() {
  return (
    // Renderiza el DashboardLayout, que envuelve el contenido de la página.
    <DashboardLayout>
      {/* Dentro del layout, se renderiza el DashboardOverview. */}
      {/* Esto carga el contenido principal del dashboard dentro del diseño general. */}
      <DashboardOverview />
    </DashboardLayout>
  )
}
