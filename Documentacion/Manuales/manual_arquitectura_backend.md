# Manual de Arquitectura Backend-Frontend - ProjectFlow

## 📋 Tabla de Contenidos
1. [Visión General del Sistema](#vision-general)
2. [Arquitectura de Comunicación](#arquitectura-comunicacion)
3. [Estructura del Backend FastAPI](#estructura-backend)
4. [Flujos por Ventana](#flujos-ventana)
5. [Gestión de Estados y Errores](#gestion-estados)
6. [Seguridad y Autenticación](#seguridad)
7. [Recomendaciones y Mejores Prácticas](#recomendaciones)

---

## 1. Visión General del Sistema {#vision-general}

### 1.1 Stack Tecnológico

**Frontend:**
- Framework: React/Vue/Angular (por definir)
- Gestión de Estado: Redux/Vuex/Context API
- HTTP Client: Axios
- WebSockets: Socket.io-client (para tiempo real)

**Backend:**
- Framework: FastAPI (Python 3.9+)
- ORM: SQLAlchemy
- Validación: Pydantic Models
- Autenticación: JWT (JSON Web Tokens)
- Base de Datos: MySQL 8.0+

### 1.2 Arquitectura General

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   Frontend  │ ◄─────► │   FastAPI    │ ◄─────► │    MySQL     │
│   (React)   │  HTTP   │   Backend    │   ORM   │   Database   │
└─────────────┘  REST   └──────────────┘         └──────────────┘
      │                        │
      │                        │
      └────────────────────────┘
           WebSocket (Real-time)
```

### 1.3 Principios de Diseño

1. **RESTful API**: Endpoints claros y semánticos
2. **Validación en Capas**: Frontend (UX) + Backend (Seguridad)
3. **Separación de Responsabilidades**: Modelos, Servicios, Controladores
4. **Seguridad por Defecto**: Autenticación y autorización en todas las rutas protegidas
5. **Respuestas Consistentes**: Formato estándar para todas las respuestas

---

## 2. Arquitectura de Comunicación {#arquitectura-comunicacion}

### 2.1 Formato de Request/Response

**Request Estándar:**
```json
{
  "headers": {
    "Authorization": "Bearer <jwt_token>",
    "Content-Type": "application/json"
  },
  "body": {
    "data": { /* payload específico */ }
  }
}
```

**Response Exitosa:**
```json
{
  "success": true,
  "data": { /* datos solicitados */ },
  "message": "Operación exitosa",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response de Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Descripción del error",
    "details": { /* detalles adicionales */ }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2.2 Códigos de Estado HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Error de validación
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: No autorizado (sin permisos)
- **404 Not Found**: Recurso no encontrado
- **422 Unprocessable Entity**: Error de validación de negocio
- **500 Internal Server Error**: Error del servidor

---

## 3. Estructura del Backend FastAPI {#estructura-backend}

### 3.1 Organización de Directorios

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Punto de entrada FastAPI
│   ├── config.py               # Configuraciones
│   ├── database.py             # Conexión DB
│   │
│   ├── models/                 # Modelos SQLAlchemy
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── team.py
│   │   └── ...
│   │
│   ├── schemas/                # Pydantic Schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── task.py
│   │   └── ...
│   │
│   ├── api/                    # Endpoints organizados por recurso
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── projects.py
│   │   ├── tasks.py
│   │   ├── teams.py
│   │   ├── logistics.py
│   │   ├── reports.py
│   │   └── settings.py
│   │
│   ├── services/               # Lógica de negocio
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── project_service.py
│   │   ├── task_service.py
│   │   └── ...
│   │
│   ├── utils/                  # Utilidades
│   │   ├── __init__.py
│   │   ├── security.py         # JWT, hashing
│   │   ├── permissions.py      # Verificación de permisos
│   │   ├── validators.py
│   │   └── responses.py        # Helpers para respuestas
│   │
│   └── dependencies/           # Dependencias FastAPI
│       ├── __init__.py
│       ├── auth.py             # get_current_user
│       └── permissions.py      # require_permission
│
├── tests/
├── alembic/                    # Migraciones de DB
└── requirements.txt
```

### 3.2 Ejemplo de Modelo (SQLAlchemy)

```python
# app/models/project.py
from sqlalchemy import Column, Integer, String, Text, Enum, DECIMAL, Date, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import enum
from datetime import datetime

class ProjectStatus(str, enum.Enum):
    PLANNING = "planning"
    IN_PROGRESS = "in_progress"
    ON_HOLD = "on_hold"
    REVIEW = "review"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PLANNING)
    priority = Column(String(20), default="medium")
    budget = Column(DECIMAL(15, 2), default=0)
    spent = Column(DECIMAL(15, 2), default=0)
    start_date = Column(Date)
    end_date = Column(Date)
    progress_percentage = Column(Integer, default=0)
    created_by = Column(Integer, ForeignKey("users.id"))
    manager_id = Column(Integer, ForeignKey("users.id"))
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    creator = relationship("User", foreign_keys=[created_by])
    manager = relationship("User", foreign_keys=[manager_id])
    tasks = relationship("Task", back_populates="project")
    members = relationship("ProjectMember", back_populates="project")
```

### 3.3 Ejemplo de Schema (Pydantic)

```python
# app/schemas/project.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime
from enum import Enum

class ProjectStatus(str, Enum):
    PLANNING = "planning"
    IN_PROGRESS = "in_progress"
    ON_HOLD = "on_hold"
    REVIEW = "review"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class ProjectBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=200)
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNING
    priority: str = "medium"
    budget: float = 0
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    manager_id: Optional[int] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=3, max_length=200)
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    priority: Optional[str] = None
    budget: Optional[float] = None
    spent: Optional[float] = None
    progress_percentage: Optional[int] = Field(None, ge=0, le=100)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    manager_id: Optional[int] = None

class ProjectResponse(ProjectBase):
    id: int
    spent: float
    progress_percentage: int
    is_archived: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
```

### 3.4 Ejemplo de Service

```python
# app/services/project_service.py
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from fastapi import HTTPException

class ProjectService:
    
    @staticmethod
    def get_projects(
        db: Session, 
        user_id: int,
        user_level: int,
        skip: int = 0,
        limit: int = 100,
        is_archived: bool = False
    ) -> List[Project]:
        """
        Obtiene proyectos según nivel de acceso del usuario
        """
        query = db.query(Project).filter(Project.is_archived == is_archived)
        
        # Nivel 1: Solo proyectos asignados
        if user_level == 1:
            query = query.join(Project.members).filter(
                ProjectMember.user_id == user_id
            )
        # Nivel 2: Proyectos del departamento (implementar según lógica)
        elif user_level == 2:
            # Filtrar por departamento del usuario
            pass
        # Nivel 3: Todos los proyectos
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def create_project(
        db: Session,
        project: ProjectCreate,
        user_id: int
    ) -> Project:
        """
        Crea un nuevo proyecto
        """
        db_project = Project(**project.dict(), created_by=user_id)
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project
    
    @staticmethod
    def update_project(
        db: Session,
        project_id: int,
        project_update: ProjectUpdate,
        user_id: int,
        user_level: int
    ) -> Project:
        """
        Actualiza un proyecto existente
        """
        db_project = db.query(Project).filter(Project.id == project_id).first()
        
        if not db_project:
            raise HTTPException(status_code=404, detail="Proyecto no encontrado")
        
        # Verificar permisos según nivel
        if user_level == 1:
            raise HTTPException(status_code=403, detail="Sin permisos para editar proyectos")
        
        # Actualizar campos
        update_data = project_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_project, field, value)
        
        db.commit()
        db.refresh(db_project)
        return db_project
```

### 3.5 Ejemplo de Endpoint

```python
# app/api/projects.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.dependencies.permissions import require_permission
from app.schemas.project import ProjectResponse, ProjectCreate, ProjectUpdate
from app.services.project_service import ProjectService
from app.utils.responses import success_response

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("", response_model=dict)
def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    is_archived: bool = Query(False),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Obtiene lista de proyectos según permisos del usuario
    """
    projects = ProjectService.get_projects(
        db=db,
        user_id=current_user.id,
        user_level=current_user.role.level,
        skip=skip,
        limit=limit,
        is_archived=is_archived
    )
    
    return success_response(
        data=[ProjectResponse.from_orm(p).dict() for p in projects],
        message="Proyectos obtenidos exitosamente"
    )

@router.post("", response_model=dict)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_permission("projects", "create"))
):
    """
    Crea un nuevo proyecto
    """
    new_project = ProjectService.create_project(
        db=db,
        project=project,
        user_id=current_user.id
    )
    
    return success_response(
        data=ProjectResponse.from_orm(new_project).dict(),
        message="Proyecto creado exitosamente",
        status_code=201
    )

@router.put("/{project_id}", response_model=dict)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(require_permission("projects", "update"))
):
    """
    Actualiza un proyecto existente
    """
    updated_project = ProjectService.update_project(
        db=db,
        project_id=project_id,
        project_update=project_update,
        user_id=current_user.id,
        user_level=current_user.role.level
    )
    
    return success_response(
        data=ProjectResponse.from_orm(updated_project).dict(),
        message="Proyecto actualizado exitosamente"
    )
```

---

## 4. Flujos por Ventana {#flujos-ventana}

### 4.1 LOGIN

#### Backend Endpoints:

**POST /api/auth/login**
```python
# Request
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}

# Response Success
{
  "success": true,
  "data": {
    "access_token": "eyJ...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "email": "usuario@ejemplo.com",
      "first_name": "Juan",
      "last_name": "Pérez",
      "role": {
        "id": 2,
        "name": "Planificador",
        "level": 2
      }
    }
  }
}

# Response Error
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email o contraseña incorrectos"
  }
}
```

#### Flujo Frontend:
1. Usuario ingresa credenciales
2. Frontend valida campos no vacíos (validación UX)
3. Envía POST a `/api/auth/login`
4. Si success=true:
   - Guarda token en sessionStorage/memoria
   - Guarda datos de usuario en estado global
   - Redirige a Panel Principal
5. Si success=false:
   - Muestra mensaje de error específico
   - Incrementa contador de intentos fallidos
   - Después de 5 intentos, muestra CAPTCHA

#### Scripts Backend Necesarios:
```python
# app/services/auth_service.py
class AuthService:
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str):
        """Autentica usuario y genera token JWT"""
        
    @staticmethod
    def verify_token(token: str):
        """Verifica validez del token JWT"""
        
    @staticmethod
    def refresh_token(refresh_token: str):
        """Genera nuevo access token desde refresh token"""
```

---

### 4.2 PANEL PRINCIPAL

#### Backend Endpoints:

**GET /api/dashboard/metrics**
```python
# Query Params: user_id (automático desde token)

# Response
{
  "success": true,
  "data": {
    "projects_active": 12,
    "tasks_completed": 248,
    "team_members": 24,
    "tasks_overdue": 7,
    "trends": {
      "projects_change": "+2",
      "tasks_change": "+18%",
      "members_change": "+3",
      "overdue_change": "-2"
    }
  }
}
```

**GET /api/dashboard/widgets**
```python
# Query Params: user_id, tab (personalizable|resumen|rendimiento)

# Response
{
  "success": true,
  "data": {
    "widgets": [
      {
        "id": "project_progress",
        "type": "progress_bar",
        "title": "Progreso del Proyecto",
        "data": {
          "percentage": 68,
          "project_name": "Website Redesign"
        }
      },
      {
        "id": "budget",
        "type": "currency",
        "title": "Presupuesto",
        "data": {
          "spent": 45000,
          "total": 60000
        }
      }
    ]
  }
}
```

**GET /api/notifications**
```python
# Query Params: user_id, is_read (optional), limit, skip

# Response
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": 1,
        "title": "Tarea Vencida",
        "message": "La tarea 'Diseño de UI' ha vencido",
        "type": "warning",
        "is_read": false,
        "created_at": "2024-01-15T09:30:00Z"
      }
    ],
    "unread_count": 2
  }
}
```

**PUT /api/notifications/{notification_id}/read**
```python
# Marca notificación como leída

# Response
{
  "success": true,
  "message": "Notificación marcada como leída"
}
```

#### Flujo Frontend:
1. Al cargar dashboard, solicitar métricas GET `/api/dashboard/metrics`
2. Solicitar widgets configurados GET `/api/dashboard/widgets?tab=personalizable`
3. Solicitar notificaciones no leídas GET `/api/notifications?is_read=false&limit=5`
4. Actualizar métricas cada 30 segundos (polling) o usar WebSocket
5. Al hacer clic en notificación, marcarla como leída PUT `/api/notifications/{id}/read`

#### Scripts Backend Necesarios:
```python
# app/services/dashboard_service.py
class DashboardService:
    @staticmethod
    def get_user_metrics(db: Session, user_id: int, user_level: int):
        """Calcula métricas según nivel de acceso"""
        
    @staticmethod
    def get_widgets_configuration(db: Session, user_id: int, tab: str):
        """Obtiene widgets configurados por usuario"""
        
    @staticmethod
    def save_widget_configuration(db: Session, user_id: int, widgets: list):
        """Guarda configuración de widgets (drag & drop)"""
```

---

### 4.3 PROYECTOS

#### Backend Endpoints:

**GET /api/projects**
```python
# Query Params: 
# - is_archived (bool)
# - status (planning|in_progress|etc)
# - priority (low|medium|high|critical)
# - search (string)
# - skip, limit

# Response
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": 1,
        "name": "Rediseño del Sitio Web",
        "description": "Renovación completa...",
        "status": "in_progress",
        "priority": "high",
        "progress_percentage": 75,
        "budget": 50000,
        "spent": 37500,
        "start_date": "2024-01-01",
        "end_date": "2024-01-15",
        "manager": {
          "id": 5,
          "name": "Sarah Johnson"
        },
        "team_size": 5
      }
    ],
    "total": 12,
    "page": 1,
    "pages": 2
  }
}
```

**GET /api/projects/{project_id}**
```python
# Response - Detalles completos del proyecto
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Rediseño del Sitio Web",
    "description": "...",
    "status": "in_progress",
    "priority": "high",
    "budget": 50000,
    "spent": 37500,
    "progress_percentage": 75,
    "start_date": "2024-01-01",
    "end_date": "2024-01-15",
    "manager": {...},
    "members": [...],
    "milestones": [...],
    "recent_activity": [...]
  }
}
```

**POST /api/projects**
```python
# Request
{
  "name": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  "status": "planning",
  "priority": "medium",
  "budget": 100000,
  "start_date": "2024-02-01",
  "end_date": "2024-06-30",
  "manager_id": 5
}

# Response
{
  "success": true,
  "data": { /* proyecto creado */ },
  "message": "Proyecto creado exitosamente"
}
```

**PUT /api/projects/{project_id}**
```python
# Request - Solo campos a actualizar
{
  "progress_percentage": 80,
  "status": "review"
}

# Response
{
  "success": true,
  "data": { /* proyecto actualizado */ },
  "message": "Proyecto actualizado exitosamente"
}
```

**DELETE /api/projects/{project_id}** (Soft delete)
```python
# Response
{
  "success": true,
  "message": "Proyecto archivado exitosamente"
}
```

#### Flujo Frontend:
1. Cargar lista de proyectos GET `/api/projects?is_archived=false`
2. Aplicar filtros: enviar nuevos query params
3. Al hacer clic en "Ver Proyecto": GET `/api/projects/{id}`
4. Al crear proyecto: Validar frontend → POST `/api/projects`
5. Al editar: PUT `/api/projects/{id}` con campos modificados
6. Al archivar: DELETE `/api/projects/{id}`

#### Scripts Backend Necesarios:
```python
# app/services/project_service.py
class ProjectService:
    @staticmethod
    def get_projects_for_user(db, user_id, user_level, filters):
        """Filtra proyectos según permisos y filtros"""
        
    @staticmethod
    def get_project_details(db, project_id, user_id, user_level):
        """Obtiene detalles con validación de permisos"""
        
    @staticmethod
    def calculate_project_progress(db, project_id):
        """Calcula progreso basado en tareas completadas"""
        
    @staticmethod
    def check_budget_alert(db, project_id):
        """Verifica si presupuesto excede umbral"""
```

---

### 4.4 TAREAS

#### Backend Endpoints:

**GET /api/tasks**
```python
# Query Params:
# - project_id (optional)
# - assigned_to (optional)
# - status, priority
# - search, skip, limit

# Response
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Design homepage wireframes",
        "description": "Create detailed wireframes...",
        "status": "in_progress",
        "priority": "high",
        "assigned_to": {
          "id": 3,
          "name": "John Doe"
        },
        "project": {
          "id": 1,
          "name": "Website Redesign"
        },
        "due_date": "2024-01-08",
        "progress_percentage": 60,
        "dependencies": [5, 8]
      }
    ],
    "total": 156
  }
}
```

**GET /api/tasks/kanban**
```python
# Query Params: project_id (optional), assigned_to

# Response - Tareas organizadas por columna
{
  "success": true,
  "data": {
    "columns": {
      "to_do": [
        { /* task 1 */ },
        { /* task 2 */ }
      ],
      "in_progress": [...],
      "in_review": [...],
      "completed": [...]
    }
  }
}
```

**POST /api/tasks**
```python
# Request
{
  "project_id": 1,
  "title": "Nueva Tarea",
  "description": "Descripción",
  "status": "to_do",
  "priority": "medium",
  "assigned_to": 3,
  "due_date": "2024-01-20",
  "estimated_hours": 8
}

# Response
{
  "success": true,
  "data": { /* tarea creada */ },
  "message": "Tarea creada exitosamente"
}
```

**PUT /api/tasks/{task_id}**
```python
# Request - Actualización de estado (Kanban drag & drop)
{
  "status": "in_progress"
}

# Response
{
  "success": true,
  "data": { /* tarea actualizada */ },
  "message": "Tarea movida a In Progress"
}
```

**POST /api/tasks/{task_id}/comments**
```python
# Request
{
  "comment": "Comentario sobre la tarea"
}

# Response
{
  "success": true,
  "data": {
    "id": 15,
    "comment": "Comentario sobre la tarea",
    "user": {...},
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### Flujo Frontend:
1. Cargar tareas según vista:
   - List View: GET `/api/tasks`
   - Kanban: GET `/api/tasks/kanban`
2. Filtros: Enviar query params actualizados
3. Crear tarea: POST `/api/tasks`
4. Drag & Drop en Kanban: PUT `/api/tasks/{id}` con nuevo status
5. Agregar comentario: POST `/api/tasks/{id}/comments`
6. WebSocket para actualizaciones en tiempo real del Kanban

#### Scripts Backend Necesarios:
```python
# app/services/task_service.py
class TaskService:
    @staticmethod
    def get_tasks_for_user(db, user_id, user_level, filters):
        """Obtiene tareas según permisos"""
        
    @staticmethod
    def get_kanban_board(db, user_id, project_id):
        """Organiza tareas por columnas Kanban"""
        
    @staticmethod
    def update_task_status(db, task_id, new_status, user_id):
        """Actualiza estado con validación de flujo"""
        
    @staticmethod
    def check_dependencies(db, task_id):
        """Valida que dependencias estén completadas"""
        
    @staticmethod
    def calculate_critical_path(db, project_id):
        """Calcula ruta crítica del proyecto"""
```

---

### 4.5 ANALÍTICAS

#### Backend Endpoints:

**GET /api/analytics/gantt**
```python
# Query Params: project_id, start_date, end_date

# Response
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": 1,
        "name": "Website Redesign",
        "start_date": "2024-01-01",
        "end_date": "2024-01-15",
        "progress": 75,
        "tasks": [
          {
            "id": 1,
            "title": "User Research",
            "start_date": "2024-01-01",
            "end_date": "2024-01-03",
            "progress": 100,
            "status": "completed",
            "is_critical_path": true
          }
        ]
      }
    ],
    "critical_path": [1, 5, 8, 12],
    "total_duration_days": 45
  }
}
```

**GET /api/analytics/critical-path**
```python
# Query Params: project_id

# Response
{
  "success": true,
  "data": {
    "duration_days": 45,
    "progress_percentage": 0,
    "risk_level": "medium",
    "critical_tasks": [
      {
        "id": 1,
        "title": "...",
        "due_date": "2024-01-08",
        "risk_level": "medium"
      }
    ],
    "risk_analysis": [
      {
        "type": "cross_project_resource_sharing",
        "impact": "high",
        "description": "Team members allocated to multiple projects"
      }
    ]
  }
}
```

**GET /api/analytics/team-performance**
```python
# Query Params: team_id, start_date, end_date

# Response
{
  "success": true,
  "data": {
    "team_efficiency": [
      {
        "team": "Frontend",
        "efficiency": 90,
        "tasks_completed": 45,
        "avg_completion_time": "3.2 days"
      }
    ],
    "skill_distribution": {
      "Frontend": 45,
      "Backend": 30,
      "QA": 15,
      "DevOps": 10
    },
    "best_teams": [
      {
        "team": "QA & Testing",
        "efficiency": 94,
        "tasks_completed": 35
      }
    ]
  }
}
```

#### Flujo Frontend:
1. Cargar Gantt: GET `/api/analytics/gantt?project_id=1`
2. Renderizar chart usando biblioteca (D3.js, Chart.js)
3. Análisis de ruta crítica: GET `/api/analytics/critical-path?project_id=1`
4. Performance de equipos: GET `/api/analytics/team-performance`
5. Actualizar datos cada 5 minutos o mediante WebSocket

#### Scripts Backend Necesarios:
```python
# app/services/analytics_service.py
class AnalyticsService:
    @staticmethod
    def generate_gantt_data(db, project_id, user_level):
        """Genera datos para visualización Gantt"""
        
    @staticmethod
    def calculate_critical_path(db, project_id):
        """Algoritmo de ruta crítica (CPM)"""
        
    @staticmethod
    def analyze_team_performance(db, team_id, date_range):
        """Calcula métricas de rendimiento de equipo"""
        
    @staticmethod
    def get_productivity_trends(db, user_id, period):
        """Tendencias de productividad temporal"""
```

---

### 4.6 EQUIPOS

#### Backend Endpoints:

**GET /api/teams**
```python
# Query Params: department (optional), is_active

# Response
{
  "success": true,
  "data": {
    "teams": [
      {
        "id": 1,
        "name": "Desarrollo Frontend",
        "description": "Equipo especializado en desarrollo de interfaces",
        "leader": {
          "id": 5,
          "name": "Sarah Johnson"
        },
        "members_count": 3,
        "active_projects": 3,
        "efficiency": 90
      }
    ]
  }
}
```

**GET /api/teams/{team_id}**
```python
# Response - Detalles completos del equipo
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Desarrollo Frontend",
    "description": "...",
    "leader": {...},
    "members": [
      {
        "id": 3,
        "name": "John Doe",
        "role": "UI/UX Designer",
        "skills": ["React", "NodeJS", "MongoDB"]
      }
    ],
    "projects": [...],
    "performance_metrics": {
      "efficiency": 90,
      "tasks_completed": 45
    }
  }
}
```

**POST /api/teams**
```python
# Request
{
  "name": "Nuevo Equipo",
  "description": "Descripción",
  "leader_id": 5,
  "department": "Desarrollo"
}

# Response
{
  "success": true,
  "data": { /* equipo creado */ },
  "message": "Equipo creado exitosamente"
}
```

**POST /api/teams/{team_id}/members**
```python
# Request - Agregar miembro
{
  "user_id": 8,
  "role": "member"
}

# Response
{
  "success": true,
  "message": "Miembro agregado al equipo"
}
```

**DELETE /api/teams/{team_id}/members/{user_id}**
```python
# Response
{
  "success": true,
  "message": "Miembro removido del equipo"
}
```

#### Flujo Frontend:
1. Listar equipos: GET `/api/teams`
2. Ver detalles: GET `/api/teams/{id}`
3. Modal "Gestionar Miembros":
   - Mostrar miembros actuales y disponibles
   - Agregar: POST `/api/teams/{id}/members`
   - Remover: DELETE `/api/teams/{id}/members/{user_id}`
4. Análisis de rendimiento: Datos incluidos en GET de detalles

#### Scripts Backend Necesarios:
```python
# app/services/team_service.py
class TeamService:
    @staticmethod
    def get_teams_for_user(db, user_id, user_level):
        """Filtra equipos según permisos"""
        
    @staticmethod
    def get_available_members(db, team_id, department):
        """Obtiene usuarios disponibles para asignar"""
        
    @staticmethod
    def validate_member_addition(db, team_id, user_id):
        """Valida que usuario no tenga sobrecarga"""
        
    @staticmethod
    def calculate_team_efficiency(db, team_id):
        """Calcula eficiencia del equipo"""
```

---

### 4.7 LOGÍSTICA

#### Backend Endpoints:

**GET /api/logistics/routes**
```python
# Query Params: status, driver_id, date

# Response
{
  "success": true,
  "data": {
    "routes": [
      {
        "id": 1,
        "route_name": "Downtown Delivery Route",
        "driver": {...},
        "vehicle": {...},
        "status": "active",
        "stops_count": 8,
        "total_distance_km": 48.2,
        "progress_percentage": 62
      }
    ]
  }
}
```

**GET /api/logistics/routes/{route_id}/tracking**
```python
# Response - Tracking en tiempo real
{
  "success": true,
  "data": {
    "current_location": {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "recorded_at": "2024-01-15T10:30:00Z"
    },
    "next_stop": {
      "location_name": "Client A",
      "eta": "2024-01-15T10:45:00Z",
      "distance_remaining_km": 2.5
    },
    "route_progress": 62
  }
}
```

**POST /api/logistics/routes**
```python
# Request
{
  "route_name": "Nueva Ruta",
  "driver_id": 3,
  "vehicle_id": 2,
  "scheduled_date": "2024-01-20",
  "stops": [
    {
      "location_name": "Warehouse A",
      "address": "123 Main St",
      "scheduled_time": "2024-01-20T08:00:00Z"
    }
  ]
}

# Response
{
  "success": true,
  "data": { /* ruta creada con optimización */ },
  "message": "Ruta creada y optimizada"
}
```

**POST /api/logistics/routes/{route_id}/optimize**
```python
# Response - Ruta optimizada
{
  "success": true,
  "data": {
    "optimized_stops": [...],
    "total_distance_km": 14.4,
    "estimated_duration_minutes": 43,
    "time_saved_minutes": 18
  },
  "message": "Ruta optimizada exitosamente"
}
```

**PUT /api/logistics/routes/{route_id}/stops/{stop_id}**
```python
# Request - Actualizar estado de parada
{
  "status": "completed",
  "actual_arrival_time": "2024-01-15T10:45:00Z",
  "notes": "Entrega completada sin problemas"
}

# Response
{
  "success": true,
  "message": "Estado de parada actualizado"
}
```

**GET /api/logistics/vehicles**
```python
# Response
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": 1,
        "vehicle_number": "Truck #001",
        "type": "truck",
        "capacity_kg": 5000,
        "status": "available",
        "last_maintenance": "2024-01-01"
      }
    ]
  }
}
```

#### Flujo Frontend:
1. Listar rutas: GET `/api/logistics/routes`
2. Vista de mapa:
   - Cargar ubicaciones de paradas
   - Tracking en tiempo real: GET `/api/logistics/routes/{id}/tracking` cada 30s
   - Usar WebSocket para actualizaciones push
3. Crear ruta: POST `/api/logistics/routes`
4. Optimizar ruta: POST `/api/logistics/routes/{id}/optimize`
5. Actualizar parada (desde móvil): PUT `/api/logistics/routes/{id}/stops/{stop_id}`
6. Mostrar vehículos disponibles: GET `/api/logistics/vehicles?status=available`

#### Scripts Backend Necesarios:
```python
# app/services/logistics_service.py
class LogisticsService:
    @staticmethod
    def optimize_route(db, route_id):
        """Algoritmo de optimización de rutas (TSP)"""
        
    @staticmethod
    def calculate_eta(db, route_id, stop_id):
        """Calcula tiempo estimado de llegada"""
        
    @staticmethod
    def update_realtime_location(db, route_id, location):
        """Actualiza ubicación GPS y emite via WebSocket"""
        
    @staticmethod
    def check_geofence_alerts(db, route_id, location):
        """Verifica entradas/salidas de zonas definidas"""
        
    @staticmethod
    def assign_optimal_vehicle(db, route_requirements):
        """Sugiere mejor vehículo según carga y distancia"""
```

---

### 4.8 REPORTES

#### Backend Endpoints:

**GET /api/reports/types**
```python
# Response - Tipos de reportes disponibles según nivel
{
  "success": true,
  "data": {
    "report_types": [
      {
        "type": "task_progress",
        "name": "Reporte de Progreso de Tareas",
        "description": "Muestra el estado de todas las tareas",
        "available_formats": ["pdf", "excel"]
      },
      {
        "type": "workload",
        "name": "Reporte de Carga de Trabajo",
        "description": "Visualiza la asignación de recursos",
        "available_formats": ["pdf", "excel", "csv"]
      }
    ]
  }
}
```

**POST /api/reports/generate**
```python
# Request
{
  "report_type": "task_progress",
  "format": "pdf",
  "filters": {
    "project_id": 1,
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}

# Response
{
  "success": true,
  "data": {
    "report_id": 15,
    "status": "processing",
    "estimated_completion": "2024-01-15T10:35:00Z"
  },
  "message": "Reporte en proceso de generación"
}
```

**GET /api/reports/{report_id}**
```python
# Response
{
  "success": true,
  "data": {
    "id": 15,
    "report_name": "Reporte de Progreso Q4",
    "report_type": "task_progress",
    "status": "completed",
    "file_path": "/downloads/reports/report_15.pdf",
    "file_size_bytes": 2458624,
    "generated_at": "2024-01-15T10:32:00Z"
  }
}
```

**GET /api/reports/{report_id}/download**
```python
# Response - Archivo binario
# Headers: Content-Type, Content-Disposition
```

**GET /api/reports/recent**
```python
# Query Params: limit

# Response
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": 15,
        "report_name": "...",
        "generated_at": "2024-01-15T10:32:00Z",
        "file_size_bytes": 2458624,
        "status": "completed"
      }
    ]
  }
}
```

**POST /api/reports/schedule**
```python
# Request - Programar reporte automático
{
  "report_name": "Reporte Semanal de Tareas",
  "report_type": "task_progress",
  "frequency": "weekly",
  "recipients": ["manager@ejemplo.com"],
  "filters": {...}
}

# Response
{
  "success": true,
  "data": {
    "scheduled_report_id": 5,
    "next_run": "2024-01-22T09:00:00Z"
  },
  "message": "Reporte programado exitosamente"
}
```

**GET /api/reports/scheduled**
```python
# Response - Lista de reportes programados
{
  "success": true,
  "data": {
    "scheduled_reports": [
      {
        "id": 5,
        "report_name": "Reporte Semanal de Tareas",
        "frequency": "weekly",
        "next_run": "2024-01-22T09:00:00Z",
        "is_active": true
      }
    ]
  }
}
```

#### Flujo Frontend:
1. Mostrar tipos disponibles: GET `/api/reports/types`
2. Configurar y generar: POST `/api/reports/generate`
3. Polling de estado: GET `/api/reports/{id}` cada 3s hasta status=completed
4. Descargar: GET `/api/reports/{id}/download`
5. Listar recientes: GET `/api/reports/recent`
6. Programar automático: POST `/api/reports/schedule`
7. Ver programados: GET `/api/reports/scheduled`

#### Scripts Backend Necesarios:
```python
# app/services/report_service.py
class ReportService:
    @staticmethod
    def generate_report_async(db, report_config, user_id):
        """Genera reporte en background con Celery/RQ"""
        
    @staticmethod
    def apply_report_filters(db, report_type, filters, user_level):
        """Aplica filtros según tipo de reporte y permisos"""
        
    @staticmethod
    def generate_pdf_report(data, template):
        """Genera PDF usando ReportLab/WeasyPrint"""
        
    @staticmethod
    def generate_excel_report(data):
        """Genera Excel usando openpyxl"""
        
    @staticmethod
    def schedule_report_job(db, config):
        """Programa tarea recurrente con Celery Beat"""
```

---

### 4.9 CONFIGURACIÓN

#### Backend Endpoints:

**GET /api/users** (Solo Nivel 3)
```python
# Query Params: role_id, is_active, search

# Response
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "email": "ana.garcia@empresa.com",
        "first_name": "Ana",
        "last_name": "García",
        "role": {...},
        "is_active": true,
        "last_login": "2024-01-15T09:30:00Z"
      }
    ]
  }
}
```

**POST /api/users** (Solo Nivel 3)
```python
# Request
{
  "email": "nuevo@empresa.com",
  "first_name": "Nombre",
  "last_name": "Apellido",
  "password": "temporal123",
  "role_id": 2,
  "department": "Ventas"
}

# Response
{
  "success": true,
  "data": { /* usuario creado */ },
  "message": "Usuario creado. Email de bienvenida enviado."
}
```

**PUT /api/users/{user_id}** (Solo Nivel 3)
```python
# Request
{
  "role_id": 2,
  "is_active": false
}

# Response
{
  "success": true,
  "message": "Usuario actualizado"
}
```

**GET /api/roles** (Solo Nivel 3)
```python
# Response
{
  "success": true,
  "data": {
    "roles": [
      {
        "id": 1,
        "name": "Administrador",
        "level": 3,
        "users_count": 2,
        "permissions": [...]
      }
    ]
  }
}
```

**PUT /api/roles/{role_id}/permissions** (Solo Nivel 3)
```python
# Request
{
  "permissions": [
    {
      "resource": "projects",
      "can_create": true,
      "can_read": true,
      "can_update": true,
      "can_delete": false
    }
  ]
}

# Response
{
  "success": true,
  "message": "Permisos actualizados"
}
```

**PUT /api/settings/security** (Solo Nivel 3)
```python
# Request
{
  "password_min_length": 8,
  "require_2fa": true,
  "session_timeout_minutes": 60
}

# Response
{
  "success": true,
  "message": "Configuración de seguridad actualizada"
}
```

**GET /api/audit-logs** (Solo Nivel 3)
```python
# Query Params: user_id, action, resource_type, start_date, end_date

# Response
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": 1,
        "user": {...},
        "action": "update",
        "resource_type": "project",
        "resource_id": 5,
        "old_values": {...},
        "new_values": {...},
        "created_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

**GET /api/users/profile** (Todos los niveles)
```python
# Response - Perfil del usuario actual
{
  "success": true,
  "data": {
    "id": 5,
    "email": "...",
    "first_name": "...",
    "role": {...},
    "preferences": {
      "theme": "light",
      "language": "es",
      "timezone": "America/Mexico_City"
    }
  }
}
```

**PUT /api/users/profile** (Todos los niveles)
```python
# Request
{
  "first_name": "Juan",
  "phone": "+52 123 456 7890",
  "timezone": "America/Mexico_City",
  "language": "es"
}

# Response
{
  "success": true,
  "message": "Perfil actualizado"
}
```

**PUT /api/users/password** (Todos los niveles)
```python
# Request
{
  "current_password": "actual123",
  "new_password": "nueva456",
  "confirm_password": "nueva456"
}

# Response
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

**POST /api/users/2fa/enable** (Todos los niveles)
```python
# Response
{
  "success": true,
  "data": {
    "qr_code": "data:image/png;base64,...",
    "secret": "BASE32SECRET",
    "backup_codes": ["12345678", "87654321"]
  },
  "message": "Escanea el código QR con tu app de autenticación"
}
```

#### Flujo Frontend:
1. Gestión de usuarios (Nivel 3):
   - Listar: GET `/api/users`
   - Crear: Modal + POST `/api/users`
   - Editar: Modal + PUT `/api/users/{id}`
   - Ver roles: GET `/api/roles`
   - Editar permisos: PUT `/api/roles/{id}/permissions`
   
2. Configuración de seguridad (Nivel 3):
   - Cargar: GET `/api/settings/security`
   - Actualizar: PUT `/api/settings/security`
   - Ver auditoría: GET `/api/audit-logs`
   
3. Perfil personal (Todos):
   - Cargar: GET `/api/users/profile`
   - Editar: PUT `/api/users/profile`
   - Cambiar contraseña: PUT `/api/users/password`
   - Activar 2FA: POST `/api/users/2fa/enable`

#### Scripts Backend Necesarios:
```python
# app/services/user_service.py
class UserService:
    @staticmethod
    def create_user(db, user_data):
        """Crea usuario y envía email de bienvenida"""
        
    @staticmethod
    def validate_password_strength(password):
        """Valida requisitos de contraseña"""
        
    @staticmethod
    def generate_2fa_secret(user_id):
        """Genera secret para 2FA"""
        
# app/services/audit_service.py
class AuditService:
    @staticmethod
    def log_action(db, user_id, action, resource_type, resource_id, old_values, new_values):
        """Registra acción en audit log"""
        
    @staticmethod
    def get_audit_logs(db, filters):
        """Obtiene logs filtrados"""
```

---

## 5. Gestión de Estados y Errores {#gestion-estados}

### 5.1 Estados de Loading

**Frontend debe manejar:**
1. **Initial Load**: Spinner en toda la página
2. **Component Load**: Skeleton loaders específicos
3. **Button Load**: Spinner en botón + disabled
4. **Background Load**: Indicador discreto

**Backend debe retornar:**
```python
# Para operaciones largas (reportes, optimizaciones)
{
  "success": true,
  "data": {
    "task_id": "abc123",
    "status": "processing",
    "estimated_completion": "2024-01-15T10:35:00Z"
  }
}
```

### 5.2 Manejo de Errores

**Códigos de Error Estándar:**
```python
# app/utils/error_codes.py
class ErrorCodes:
    # Autenticación
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
    TOKEN_EXPIRED = "TOKEN_EXPIRED"
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS"
    
    # Validación
    VALIDATION_ERROR = "VALIDATION_ERROR"
    REQUIRED_FIELD = "REQUIRED_FIELD"
    INVALID_FORMAT = "INVALID_FORMAT"
    
    # Negocio
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND"
    DUPLICATE_RESOURCE = "DUPLICATE_RESOURCE"
    BUSINESS_RULE_VIOLATION = "BUSINESS_RULE_VIOLATION"
    
    # Sistema
    DATABASE_ERROR = "DATABASE_ERROR"
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR"
```

**Helper de Respuestas:**
```python
# app/utils/responses.py
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse

def success_response(data=None, message="Success", status_code=200):
    return JSONResponse(
        status_code=status_code,
        content={
            "success": True,
            "data": data,
            "message": message,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

def error_response(code, message, details=None, status_code=400):
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "error": {
                "code": code,
                "message": message,
                "details": details
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    )
```

### 5.3 Validación en Capas

**Capa 1: Frontend (UX)**
- Campos requeridos
- Formatos básicos (email, teléfono)
- Longitud mínima/máxima
- Feedback visual inmediato

**Capa 2: Backend (Seguridad)**
- Pydantic schemas automáticos
- Validaciones de negocio personalizadas
- Sanitización de inputs
- Verificación de permisos

**Ejemplo:**
```python
# app/schemas/project.py
from pydantic import BaseModel, validator
from datetime import date

class ProjectCreate(BaseModel):
    name: str
    start_date: date
    end_date: date
    budget: float
    
    @validator('name')
    def name_must_be_valid(cls, v):
        if len(v) < 3:
            raise ValueError('El nombre debe tener al menos 3 caracteres')
        return v.strip()
    
    @validator('end_date')
    def end_date_must_be_after_start(cls, v, values):
        if 'start_date' in values and v < values['start_date']:
            raise ValueError('La fecha de fin debe ser posterior a la de inicio')
        return v
    
    @validator('budget')
    def budget_must_be_positive(cls, v):
        if v < 0:
            raise ValueError('El presupuesto debe ser positivo')
        return v
```

---

## 6. Seguridad y Autenticación {#seguridad}

### 6.1 JWT Implementation

**Estructura del Token:**
```python
# app/utils/security.py
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key-here"  # En producción usar variables de entorno
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
```

**Dependencia de Autenticación:**
```python
# app/dependencies/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.security import verify_token
from app.models.user import User

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials
    payload = verify_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )
    
    user_id = payload.get("user_id")
    user = db.query(User).filter(User.id == user_id).first()
    
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado o inactivo"
        )
    
    return user
```

### 6.2 Sistema de Permisos

**Dependencia de Permisos:**
```python
# app/dependencies/permissions.py
from fastapi import Depends, HTTPException, status
from app.dependencies.auth import get_current_user
from app.models.user import User

def require_permission(resource: str, action: str):
    """
    Decorator para verificar permisos
    resource: "projects", "tasks", "users", etc.
    action: "create", "read", "update", "delete"
    """
    def permission_checker(current_user: User = Depends(get_current_user)):
        # Verificar en tabla role_permissions
        permission = db.query(RolePermission).filter(
            RolePermission.role_id == current_user.role_id,
            RolePermission.resource == resource
        ).first()
        
        if not permission:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Sin permisos para {action} en {resource}"
            )
        
        # Verificar acción específica
        if action == "create" and not permission.can_create:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
        # ... similar para otras acciones
        
        return current_user
    
    return permission_checker
```

### 6.3 Seguridad de Contraseñas

```python
# app/utils/security.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```

### 6.4 Rate Limiting

```python
# app/middleware/rate_limit.py
from fastapi import Request, HTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# Uso en endpoints:
@router.post("/login")
@limiter.limit("5/minute")  # 5 intentos por minuto
def login(request: Request, credentials: LoginSchema):
    # ...
```

---

## 7. Recomendaciones y Mejores Prácticas {#recomendaciones}

### 7.1 Arquitectura Backend

**1. Separación de Responsabilidades**
- **Modelos**: Solo definición de estructura de datos
- **Schemas**: Validación y serialización
- **Services**: Lógica de negocio compleja
- **API Routes**: Orquestación y respuestas HTTP

**2. Uso de Transacciones**
```python
from sqlalchemy.orm import Session

def create_project_with_team(db