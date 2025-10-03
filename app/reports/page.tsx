// Importa el componente DashboardLayout, que proporciona la estructura de diseño común para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente ReportsGenerator, que se encarga de generar y mostrar informes.
import { ReportsGenerator } from "@/components/reports/reports-generator"

// Componente funcional ReportsPage.
// Este componente es responsable de renderizar la página de informes.
export default function ReportsPage() {
  return (
    // Utiliza DashboardLayout para mantener la coherencia en el diseño de la aplicación.
    <DashboardLayout>
      // Renderiza el componente ReportsGenerator, que se encarga de la lógica y la UI para la generación de informes.
      <ReportsGenerator />
    </DashboardLayout>
  )
}
