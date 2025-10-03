-- ============================================
-- ProjectFlow Database Schema - MySQL 8.0+
-- ============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS projectflow_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE projectflow_db;

-- ============================================
-- TABLAS DE USUARIOS Y AUTENTICACIÓN
-- ============================================

-- Tabla de Roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nombre del rol: Administrador, Planificador, Colaborador',
    description TEXT COMMENT 'Descripción detallada del rol',
    level INT NOT NULL COMMENT 'Nivel de acceso: 1=Campo, 2=Administrativo, 3=Administrador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_level (level)
) ENGINE=InnoDB COMMENT='Roles de usuario en el sistema';

-- Tabla de Permisos por Rol
CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    resource VARCHAR(50) NOT NULL COMMENT 'Recurso: projects, tasks, teams, logistics, reports, settings',
    can_create BOOLEAN DEFAULT FALSE,
    can_read BOOLEAN DEFAULT TRUE,
    can_update BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    additional_permissions JSON COMMENT 'Permisos adicionales específicos en formato JSON',
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY uk_role_resource (role_id, resource),
    INDEX idx_resource (resource)
) ENGINE=InnoDB COMMENT='Permisos granulares por rol y recurso';

-- Tabla de Usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role_id INT NOT NULL,
    department VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'es',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    last_login TIMESTAMP NULL,
    password_changed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_email (email),
    INDEX idx_role_id (role_id),
    INDEX idx_is_active (is_active),
    INDEX idx_department (department)
) ENGINE=InnoDB COMMENT='Usuarios del sistema';

-- Tabla de Sesiones de Usuario
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB COMMENT='Tokens de sesión activos';

-- ============================================
-- TABLAS DE PROYECTOS
-- ============================================

-- Tabla de Proyectos
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('planning', 'in_progress', 'on_hold', 'review', 'completed', 'cancelled') DEFAULT 'planning',
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    budget DECIMAL(15,2) DEFAULT 0,
    spent DECIMAL(15,2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    created_by INT NOT NULL,
    manager_id INT,
    client_name VARCHAR(200),
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (manager_id) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_manager_id (manager_id),
    INDEX idx_is_archived (is_archived),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB COMMENT='Proyectos principales del sistema';

-- Tabla de Miembros del Proyecto
CREATE TABLE project_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('manager', 'member', 'viewer') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_project_user (project_id, user_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB COMMENT='Miembros asignados a cada proyecto';

-- Tabla de Milestones/Hitos
CREATE TABLE milestones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB COMMENT='Hitos importantes de los proyectos';

-- ============================================
-- TABLAS DE TAREAS
-- ============================================

-- Tabla de Tareas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('to_do', 'in_progress', 'in_review', 'blocked', 'completed') DEFAULT 'to_do',
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    assigned_to INT,
    due_date DATE,
    estimated_hours INT,
    actual_hours INT DEFAULT 0,
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_project_id (project_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_due_date (due_date),
    FULLTEXT idx_title_description (title, description)
) ENGINE=InnoDB COMMENT='Tareas individuales de los proyectos';

-- Tabla de Dependencias entre Tareas
CREATE TABLE task_dependencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL COMMENT 'Tarea que depende',
    depends_on_task_id INT NOT NULL COMMENT 'Tarea de la que depende',
    dependency_type ENUM('finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish') DEFAULT 'finish_to_start',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (depends_on_task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    UNIQUE KEY uk_task_dependency (task_id, depends_on_task_id),
    CHECK (task_id != depends_on_task_id),
    INDEX idx_task_id (task_id),
    INDEX idx_depends_on (depends_on_task_id)
) ENGINE=InnoDB COMMENT='Dependencias entre tareas para análisis de ruta crítica';

-- Tabla de Comentarios en Tareas
CREATE TABLE task_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='Comentarios y discusiones sobre tareas';

-- Tabla de Archivos Adjuntos
CREATE TABLE task_attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL COMMENT 'Tamaño en bytes',
    mime_type VARCHAR(100),
    uploaded_by INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    INDEX idx_task_id (task_id),
    INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB COMMENT='Archivos adjuntos a las tareas';

-- ============================================
-- TABLAS DE EQUIPOS
-- ============================================

-- Tabla de Equipos
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    leader_id INT,
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (leader_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_leader_id (leader_id),
    INDEX idx_department (department),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB COMMENT='Equipos de trabajo';

-- Tabla de Miembros del Equipo
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('leader', 'senior', 'member', 'junior') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_team_user (team_id, user_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB COMMENT='Miembros asignados a cada equipo';

-- Tabla de Asignación Equipos a Proyectos
CREATE TABLE project_teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    team_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    UNIQUE KEY uk_project_team (project_id, team_id)
) ENGINE=InnoDB COMMENT='Asignación de equipos a proyectos';

-- ============================================
-- TABLAS DE LOGÍSTICA
-- ============================================

-- Tabla de Vehículos
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(50) NOT NULL UNIQUE,
    vehicle_type ENUM('truck', 'van', 'car', 'motorcycle') DEFAULT 'van',
    capacity_kg INT,
    status ENUM('available', 'in_use', 'maintenance', 'out_of_service') DEFAULT 'available',
    last_maintenance DATE,
    next_maintenance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_vehicle_type (vehicle_type)
) ENGINE=InnoDB COMMENT='Vehículos de la flota';

-- Tabla de Rutas
CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(200) NOT NULL,
    driver_id INT,
    vehicle_id INT,
    status ENUM('planned', 'active', 'completed', 'cancelled') DEFAULT 'planned',
    total_distance_km DECIMAL(10,2),
    estimated_duration_minutes INT,
    progress_percentage INT DEFAULT 0,
    scheduled_date DATE NOT NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    INDEX idx_driver_id (driver_id),
    INDEX idx_vehicle_id (vehicle_id),
    INDEX idx_status (status),
    INDEX idx_scheduled_date (scheduled_date)
) ENGINE=InnoDB COMMENT='Rutas de distribución y logística';

-- Tabla de Paradas de Ruta
CREATE TABLE route_stops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT NOT NULL,
    sequence_order INT NOT NULL COMMENT 'Orden de visita en la ruta',
    location_name VARCHAR(200) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status ENUM('pending', 'in_transit', 'completed', 'failed') DEFAULT 'pending',
    scheduled_time TIMESTAMP,
    actual_arrival_time TIMESTAMP NULL,
    actual_departure_time TIMESTAMP NULL,
    notes TEXT,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    INDEX idx_route_id (route_id),
    INDEX idx_sequence_order (sequence_order),
    INDEX idx_status (status),
    INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB COMMENT='Paradas individuales en cada ruta';

-- Tabla de Tracking en Tiempo Real
CREATE TABLE route_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    speed_kmh DECIMAL(5,2),
    heading INT COMMENT 'Dirección en grados 0-360',
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    INDEX idx_route_id (route_id),
    INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB COMMENT='Registro de ubicaciones GPS para tracking';

-- ============================================
-- TABLAS DE REPORTES
-- ============================================

-- Tabla de Reportes Generados
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_name VARCHAR(200) NOT NULL,
    report_type ENUM('task_progress', 'workload', 'timeline', 'budget', 'team_performance', 'custom') NOT NULL,
    generated_by INT NOT NULL,
    filters JSON COMMENT 'Filtros aplicados al generar el reporte',
    file_path VARCHAR(500),
    file_format ENUM('pdf', 'excel', 'csv') DEFAULT 'pdf',
    file_size_bytes INT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (generated_by) REFERENCES users(id),
    INDEX idx_generated_by (generated_by),
    INDEX idx_report_type (report_type),
    INDEX idx_generated_at (generated_at)
) ENGINE=InnoDB COMMENT='Historial de reportes generados';

-- Tabla de Reportes Programados
CREATE TABLE scheduled_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_name VARCHAR(200) NOT NULL,
    report_type ENUM('task_progress', 'workload', 'timeline', 'budget', 'team_performance', 'custom') NOT NULL,
    frequency ENUM('daily', 'weekly', 'monthly', 'quarterly') NOT NULL,
    recipients JSON NOT NULL COMMENT 'Array de emails para envío',
    filters JSON COMMENT 'Filtros a aplicar automáticamente',
    next_run TIMESTAMP NOT NULL,
    last_run TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_next_run (next_run),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB COMMENT='Configuración de reportes automáticos';

-- ============================================
-- TABLAS DE NOTIFICACIONES
-- ============================================

-- Tabla de Notificaciones
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error', 'task', 'project', 'system') DEFAULT 'info',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    is_read BOOLEAN DEFAULT FALSE,
    related_resource_type VARCHAR(50) COMMENT 'tipo: task, project, route, etc',
    related_resource_id INT COMMENT 'ID del recurso relacionado',
    metadata JSON COMMENT 'Datos adicionales de la notificación',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='Sistema de notificaciones para usuarios';

-- ============================================
-- TABLAS DE AUDITORÍA Y CONFIGURACIÓN
-- ============================================

-- Tabla de Logs de Auditoría
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL COMMENT 'login, create, update, delete, etc',
    resource_type VARCHAR(50) NOT NULL,
    resource_id INT,
    old_values JSON COMMENT 'Valores anteriores antes del cambio',
    new_values JSON COMMENT 'Nuevos valores después del cambio',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='Registro de auditoría de todas las acciones importantes';

-- Tabla de Configuración del Sistema
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE COMMENT 'Si es visible para usuarios no admin',
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id),
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
) ENGINE=InnoDB COMMENT='Configuraciones globales del sistema';

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar roles por defecto
INSERT INTO roles (name, description, level) VALUES
('Administrador', 'Acceso completo al sistema con capacidades de configuración', 3),
('Planificador', 'Gestión de proyectos y equipos a nivel departamental', 2),
('Colaborador', 'Acceso a tareas y proyectos asignados', 1);

-- Insertar usuario administrador por defecto
-- Contraseña: Admin123! (deberá cambiarse en producción)
INSERT INTO users (email, password_hash, first_name, last_name, role_id, is_active) VALUES
('admin@projectflow.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Sistema', 1, TRUE);

-- Configuraciones iniciales del sistema
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('app_name', 'ProjectFlow', 'string', 'Nombre de la aplicación', TRUE),
('timezone', 'UTC', 'string', 'Zona horaria por defecto', TRUE),
('language', 'es', 'string', 'Idioma por defecto', TRUE),
('password_min_length', '8', 'integer', 'Longitud mínima de contraseña', FALSE),
('session_timeout_minutes', '60', 'integer', 'Tiempo de expiración de sesión en minutos', FALSE),
('auto_archive_completed_projects_days', '30', 'integer', 'Días después de completar para archivar automáticamente', FALSE),
('max_file_upload_size_mb', '50', 'integer', 'Tamaño máximo de archivo en MB', FALSE);