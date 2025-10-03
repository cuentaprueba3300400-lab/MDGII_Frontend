/*
 * This file defines the TasksList component, which displays a list of tasks with filtering, selection, and action capabilities.
 * It allows users to view tasks, filter them by various criteria (search term, status, priority, project, assignee),
 * select multiple tasks for bulk actions, and see task details like due dates, estimated/completed hours, and dependencies.
 * The component uses mock data for tasks and integrates with UI components for a rich user experience.
 */
"use client"

/*
 * React and UI Component Imports
 * These imports bring in necessary components from the UI library and React for building the user interface.
 */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

/*
 * Icon Imports
 * These imports bring in icons from the 'lucide-react' library for visual representation within the UI.
 */
import { Calendar, Clock, MoreHorizontal, Edit, Trash2, Eye, Link, Flag, User } from "lucide-react"

interface TasksListProps {
  searchTerm: string
  statusFilter: string
  priorityFilter: string
  projectFilter: string
  assigneeFilter: string
}

/*
 * Mock Data
 * This section contains mock data for tasks, used for demonstration purposes.
 * In a real application, this data would typically be fetched from a backend API.
 */
const mockTasks = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create detailed wireframes for the new homepage layout including mobile responsive design",
    status: "in-progress",
    priority: "high",
    project: "Website Redesign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-08",
    createdDate: "2024-01-01",
    dependencies: ["2"],
    tags: ["design", "ui/ux"],
    estimatedHours: 8,
    completedHours: 5,
  },
  {
    id: "2",
    title: "User research analysis",
    description: "Analyze user feedback and research data to inform design decisions",
    status: "completed",
    priority: "medium",
    project: "Website Redesign",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "jane-smith",
    },
    dueDate: "2024-01-05",
    createdDate: "2023-12-28",
    dependencies: [],
    tags: ["research", "analysis"],
    estimatedHours: 12,
    completedHours: 12,
  },
  {
    id: "3",
    title: "API endpoint development",
    description: "Develop REST API endpoints for user authentication and data management",
    status: "todo",
    priority: "critical",
    project: "Mobile App",
    assignee: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "mike-wilson",
    },
    dueDate: "2024-01-12",
    createdDate: "2024-01-02",
    dependencies: ["4"],
    tags: ["backend", "api"],
    estimatedHours: 16,
    completedHours: 0,
  },
  {
    id: "4",
    title: "Database schema design",
    description: "Design and implement database schema for the mobile application",
    status: "in-progress",
    priority: "high",
    project: "Mobile App",
    assignee: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "lisa-chen",
    },
    dueDate: "2024-01-10",
    createdDate: "2024-01-01",
    dependencies: [],
    tags: ["database", "backend"],
    estimatedHours: 10,
    completedHours: 6,
  },
  {
    id: "5",
    title: "Marketing content creation",
    description: "Create engaging content for social media marketing campaign",
    status: "review",
    priority: "medium",
    project: "Marketing Campaign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-09",
    createdDate: "2024-01-03",
    dependencies: [],
    tags: ["marketing", "content"],
    estimatedHours: 6,
    completedHours: 6,
  },
]

/*
 * TasksList Component
 * This functional component displays a filterable and selectable list of tasks.
 * It manages task selection, filtering logic, and renders individual task cards.
 */
export function TasksList({ searchTerm, statusFilter, priorityFilter, projectFilter, assigneeFilter }: TasksListProps) {
  /*
   * State for selected tasks
   * Manages the list of currently selected task IDs for bulk actions.
   */
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  /*
   * filteredTasks
   * Filters the mockTasks array based on the provided search term, status, priority, project, and assignee filters.
   * This ensures only relevant tasks are displayed in the list.
   */
  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project.toLowerCase().replace(/\s+/g, "-") === projectFilter
    const matchesAssignee = assigneeFilter === "all" || task.assignee.id === assigneeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesAssignee
  })

  /*
   * getStatusColor
   * Determines the appropriate color variant for a task's status badge.
   * @param status - The status of the task (e.g., "completed", "in-progress", "review", "todo").
   * @returns A string representing the badge variant.
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "review":
        return "outline"
      case "todo":
        return "secondary"
      default:
        return "secondary"
    }
  }

  /*
   * getPriorityColor
   * Determines the appropriate color variant for a task's priority badge.
   * @param priority - The priority level of the task (e.g., "critical", "high", "medium", "low").
   * @returns A string representing the badge variant.
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  /*
   * getStatusIcon
   * Returns a Unicode icon based on the task's status.
   * @param status - The status of the task.
   * @returns A string containing a Unicode icon.
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓"
      case "in-progress":
        return "⏳"
      case "review":
        return "👁"
      case "todo":
        return "○"
      default:
        return "○"
    }
  }

  /*
   * toggleTaskSelection
   * Adds or removes a task ID from the `selectedTasks` state.
   * @param taskId - The ID of the task to toggle selection for. -
   */
  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  /*
   * isOverdue
   * Checks if a task is overdue based on its due date and status.
   * A task is considered overdue if its due date is in the past and it's not marked as "completed".
   * @param dueDate - The due date of the task.
   * @returns A boolean indicating whether the task is overdue.
   */
  const isOverdue = (dueDate: string) => {
    return (
      new Date(dueDate) < new Date() &&
      !["completed"].includes(mockTasks.find((t) => t.dueDate === dueDate)?.status || "")
    )
  }

  return (
    /*
     * Main Task List Container
     * This div provides consistent spacing for the task list and bulk action bar.
     */
    <div className="space-y-4">
      /*
       * Bulk Action Bar
       * Conditionally rendered when one or more tasks are selected.
       * Provides options for bulk editing, marking complete, or deleting selected tasks.
       */
      {selectedTasks.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selectedTasks.length} tasks selected</span>
          <Button variant="outline" size="sm">
            Bulk Edit
          </Button>
          <Button variant="outline" size="sm">
            Mark Complete
          </Button>
          <Button variant="outline" size="sm">
            Delete
          </Button>
        </div>
      )}

      /*
       * Individual Task Cards Container
       * This div holds all the filterable task cards.
       */
      <div className="space-y-2">
        /*
         * Task Card Mapping
         * Iterates over the `filteredTasks` array to render each task as a Card component.
         * Adds a visual indicator (border) if the task is overdue.
         */
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`hover:shadow-md transition-shadow ${isOverdue(task.dueDate) ? "border-destructive/50" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                /* Checkbox for Task Selection */
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={() => toggleTaskSelection(task.id)}
                  className="mt-1"
                />

                <div className="flex-1 space-y-2">
                  /* Task Header: Title, Overdue Badge, and Dropdown Menu */
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getStatusIcon(task.status)}</span>
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        {isOverdue(task.dueDate) && (
                          <Badge variant="destructive" className="text-xs">
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{task.description}</p>
                    </div>
                    /* Dropdown Menu for Task Actions */
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="mr-2 h-4 w-4" />
                          Manage Dependencies
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  /* Task Metadata: Status, Priority, Due Date, Hours, Assignee */
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      /* Status Badge */
                      <Badge variant={getStatusColor(task.status)} className="capitalize">
                        {task.status.replace("-", " ")}
                      </Badge>
                      /* Priority Badge */
                      <Badge variant={getPriorityColor(task.priority)} className="capitalize">
                        <Flag className="mr-1 h-3 w-3" />
                        {task.priority}
                      </Badge>
                    </div>

                    /* Due Date */
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due {task.dueDate}</span>
                    </div>

                    /* Estimated vs. Completed Hours */
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {task.completedHours}h / {task.estimatedHours}h
                      </span>
                    </div>

                    /* Assignee Information */
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{task.assignee.name}</span>
                    </div>
                  </div>

                  /* Project, Dependencies, and Tags */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Project:</span>
                      /* Project Badge */
                      <Badge variant="outline" className="text-xs">
                        {task.project}
                      </Badge>
                      /* Dependencies Badge (conditionally rendered) */
                      {task.dependencies.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Link className="mr-1 h-3 w-3" />
                          {task.dependencies.length} dependencies
                        </Badge>
                      )}
                    </div>
                    /* Tags */
                    <div className="flex gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      /* No Tasks Found Message */
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
