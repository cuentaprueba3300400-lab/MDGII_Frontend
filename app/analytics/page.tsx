// Importa el componente DashboardLayout desde la ruta especificada.
// Este componente proporciona la estructura de diseño general para las páginas del dashboard.
import { DashboardLayout } from "@/components/layout/dashboard-layout"
// Importa el componente GanttChartView desde la ruta especificada.
// Este componente es responsable de mostrar la vista del diagrama de Gantt.
import { GanttChartView } from "@/components/gantt/gantt-chart-view"

// Define el componente funcional AnalyticsPage.
// Este componente representa la página principal de analíticas de la aplicación.
export default function AnalyticsPage() {
  return (
    // Renderiza el DashboardLayout, que envuelve el contenido de la página.
    <DashboardLayout>
      {/* Dentro del layout, se renderiza el GanttChartView. */}
      {/* Esto sugiere que la página de analíticas se centra en la visualización de proyectos a través de un diagrama de Gantt. */}
      <GanttChartView />
    </DashboardLayout>
  )
}
