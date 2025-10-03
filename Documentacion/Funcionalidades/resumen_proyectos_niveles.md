# Funcionalidades de la Ventana Proyectos por Nivel de Acceso

## 🔧 **Nivel 1: Personal de Campo**

### **Vista de Proyectos**
- **Solo proyectos asignados**: Filtrado automático por asignación directa
- **Vista simplificada**: Cards con métricas esenciales (progreso, fecha límite, equipo)
- **Estados visuales claros**: En progreso, planificación, revisión

### **Acciones Permitidas**
- Ver detalles del proyecto (solo pestañas Overview y Tasks)
- Actualizar progreso de tareas propias
- Comentar en actividades del proyecto
- Ver miembros del equipo asignado
- Descargar archivos del proyecto

### **Limitaciones**
- No pueden crear/editar proyectos
- No ven información presupuestaria detallada
- No pueden reasignar tareas a otros
- No acceden a métricas financieras

---

## 👔 **Nivel 2: Personal Administrativo**

### **Vista de Proyectos**
- **Proyectos departamentales**: Todos los proyectos bajo su supervisión
- **Métricas avanzadas**: Presupuesto, rentabilidad, eficiencia por equipo
- **Filtros múltiples**: Estado, prioridad, departamento, cliente
- **Vista comparativa**: Rendimiento entre proyectos similares

### **Acciones Permitidas**
- Crear/editar proyectos de su departamento
- Asignar y reasignar miembros del equipo
- Aprobar cambios de presupuesto (hasta límite establecido)
- Gestionar milestones y deadlines
- Generar reportes departamentales
- Archivar proyectos completados

### **Capacidades Especiales**
- **Análisis de recursos**: Ver disponibilidad y carga de trabajo
- **Alertas proactivas**: Proyectos en riesgo, sobrecostos
- **Templates**: Crear plantillas de proyecto para su área

---

## 🎯 **Nivel 3: Administrador**

### **Vista de Proyectos**
- **Vista organizacional completa**: Todos los proyectos de la empresa
- **KPIs estratégicos**: ROI, margen de beneficio, satisfacción cliente
- **Análisis predictivo**: Proyecciones de demanda y capacidad
- **Métricas comparativas**: Por región, cliente, tipo de proyecto

### **Acciones Permitidas**
- Control total sobre todos los proyectos
- Configurar templates globales de empresa
- Aprobar presupuestos sin límite
- Reasignar recursos entre departamentos
- Configurar procesos y workflows
- Análisis de rentabilidad por cliente/proyecto

### **Capacidades Especiales**
- **Vista estratégica**: Dashboard ejecutivo con métricas clave
- **Simulación de escenarios**: "¿Qué pasa si cancelamos este proyecto?"
- **Análisis de portfolio**: Balanceo de riesgo/beneficio
- **Configuración global**: Tipos de proyecto, estados, prioridades

---

## 🚨 **Advertencias por Nivel**

### **Nivel Campo**
- **Sobrecarga de información**: Mostrar solo lo relevante para su rol
- **Acciones limitadas**: Evitar confusión con botones que no pueden usar
- **Contexto claro**: Siempre mostrar en qué proyecto están trabajando

### **Nivel Administrativo**
- **Complejidad escalable**: No abrumar con todas las métricas de una vez
- **Responsabilidad financiera**: Límites claros en aprobaciones presupuestarias
- **Conflictos de recursos**: Alertas cuando sus decisiones afectan otros departamentos

### **Nivel Administrador**
- **Sobrecarga de datos**: Implementar vistas progresivas (drill-down)
- **Decisiones críticas**: Confirmaciones dobles para acciones irreversibles
- **Consistencia de datos**: Asegurar que las métricas globales coincidan con las departamentales

---

## 📊 **Recomendaciones Específicas**

### **Sistema de Notificaciones**
- **Campo**: Tareas vencidas, cambios en sus proyectos
- **Administrativo**: Presupuestos en riesgo, conflictos de recursos
- **Administrador**: Solo alertas críticas organizacionales

### **Personalización de Vista**
- **Campo**: Widgets básicos (progreso, fechas, equipo)
- **Administrativo**: Dashboards configurables por departamento
- **Administrador**: Métricas estratégicas personalizables

### **Flujo de Aprobaciones**
- Cambios menores: Auto-aprobación por nivel administrativo
- Cambios de presupuesto >20%: Requieren aprobación de administrador
- Nuevos proyectos: Proceso de aprobación según monto

### **Integración con Otras Ventanas**
- **Con Tareas**: Sincronización automática de progreso
- **Con Equipos**: Disponibilidad y capacidad en tiempo real
- **Con Reportes**: Generación automática según nivel de acceso