// Importa el componente DashboardLayout desde la ruta especificada.
// Este componente proporciona la estructura de diseño general para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente LogisticsManagement desde la ruta especificada.
// Este componente es el contenido principal de la página de logística, mostrando la gestión logística.
import { LogisticsManagement } from "@/components/logistics/logistics-management"

// Define el componente funcional LogisticsPage.
// Este componente representa la página principal de logística de la aplicación.
export default function LogisticsPage() {
  return (
    // Renderiza el DashboardLayout, que envuelve el contenido de la página.
    <DashboardLayout>
      {/* Dentro del layout, se renderiza el LogisticsManagement. */}
      {/* Esto carga el contenido principal de la gestión logística dentro del diseño general. */}
      <LogisticsManagement />
    </DashboardLayout>
  )
}
