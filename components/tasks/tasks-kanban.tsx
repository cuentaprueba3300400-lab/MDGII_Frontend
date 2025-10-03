/*
 * This file defines the TasksKanban component, which displays tasks in a Kanban board layout.
 * It includes features for filtering tasks by search term, priority, project, and assignee.
 * The component uses mock data for tasks and organizes them into columns based on their status (To Do, In Progress, In Review, Completed).
 * Each task card shows details like title, description, priority, due date, estimated/completed hours, project, and assignee.
 * It also provides visual cues for overdue tasks and progress for in-progress tasks.
 */
"use client"

/*
 * React and UI Component Imports
 * These imports bring in necessary components from the UI library and React for building the user interface.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, Flag, User } from "lucide-react"

/*
 * Interface Definitions
 * Defines the props for the TasksKanban component.
 */

interface TasksKanbanProps {
  searchTerm: string
  priorityFilter: string
  projectFilter: string
  assigneeFilter: string
}

/*
 * Mock Data
 * This section contains mock data used for demonstration purposes.
 * In a real application, this data would typically be fetched from a backend API.
 */
const mockTasks = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create detailed wireframes for the new homepage layout",
    status: "in-progress",
    priority: "high",
    project: "Website Redesign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-08",
    estimatedHours: 8,
    completedHours: 5,
  },
  {
    id: "2",
    title: "User research analysis",
    description: "Analyze user feedback and research data",
    status: "completed",
    priority: "medium",
    project: "Website Redesign",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "jane-smith",
    },
    dueDate: "2024-01-05",
    estimatedHours: 12,
    completedHours: 12,
  },
  {
    id: "3",
    title: "API endpoint development",
    description: "Develop REST API endpoints for user authentication",
    status: "todo",
    priority: "critical",
    project: "Mobile App",
    assignee: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "mike-wilson",
    },
    dueDate: "2024-01-12",
    estimatedHours: 16,
    completedHours: 0,
  },
  {
    id: "4",
    title: "Database schema design",
    description: "Design and implement database schema",
    status: "in-progress",
    priority: "high",
    project: "Mobile App",
    assignee: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "lisa-chen",
    },
    dueDate: "2024-01-10",
    estimatedHours: 10,
    completedHours: 6,
  },
  {
    id: "5",
    title: "Marketing content creation",
    description: "Create engaging content for social media",
    status: "review",
    priority: "medium",
    project: "Marketing Campaign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-09",
    estimatedHours: 6,
    completedHours: 6,
  },
  {
    id: "6",
    title: "Mobile UI components",
    description: "Build reusable UI components for mobile app",
    status: "todo",
    priority: "medium",
    project: "Mobile App",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "jane-smith",
    },
    dueDate: "2024-01-15",
    estimatedHours: 14,
    completedHours: 0,
  },
]

/*
 * Column Definitions
 * Defines the columns for the Kanban board, each representing a task status.
 */
const columns = [
  { id: "todo", title: "To Do", status: "todo" },
  { id: "in-progress", title: "In Progress", status: "in-progress" },
  { id: "review", title: "In Review", status: "review" },
  { id: "completed", title: "Completed", status: "completed" },
]

/*
 * TasksKanban Component
 * This functional component renders the Kanban board with tasks.
 * It filters tasks based on the provided search and filter terms.
 */

export function TasksKanban({ searchTerm, priorityFilter, projectFilter, assigneeFilter }: TasksKanbanProps) {
  /*
   * filteredTasks
   * Filters the mockTasks array based on the provided searchTerm, priorityFilter, projectFilter, and assigneeFilter.
   * This ensures only relevant tasks are displayed in the Kanban board.
   */
  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project.toLowerCase().replace(/\s+/g, "-") === projectFilter
    const matchesAssignee = assigneeFilter === "all" || task.assignee.id === assigneeFilter

    return matchesSearch && matchesPriority && matchesProject && matchesAssignee
  })

  /*
   * getPriorityColor
   * Determines the appropriate color variant for a task's priority badge.
   * @param priority - The priority level of the task (e.g., "critical", "high", "medium", "low").
   * @returns A string representing the badge variant (e.g., "destructive", "default", "secondary", "outline").
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
   * getTasksByStatus
   * Filters the `filteredTasks` array to return tasks that match a specific status.
   * @param status - The status to filter tasks by (e.g., "todo", "in-progress", "review", "completed").
   * @returns An array of tasks matching the given status.
   */
  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  /*
   * isOverdue
   * Checks if a task is overdue based on its due date and current status.
   * A task is considered overdue if its due date is in the past and its status is not "completed".
   * @param dueDate - The due date of the task in a string format (e.g., "YYYY-MM-DD").
   * @param status - The current status of the task.
   * @returns A boolean indicating whether the task is overdue.
   */
  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "completed"
  }

  return (
    /*
     * Main Kanban Board Container
     * This div sets up a responsive grid layout for the Kanban columns.
     * It adjusts the number of columns based on screen size (1 for small, 2 for medium, 4 for large).
     * The height is dynamically calculated to ensure it fits within the viewport.
     */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
      {/*
       * Column Mapping
       * Iterates over the `columns` array to render each Kanban column.
       * Each column represents a task status (e.g., "To Do", "In Progress").
       */}
      {columns.map((column) => {
        const tasks = getTasksByStatus(column.status)
        return (
          /*
           * Individual Kanban Column
           * This div acts as a container for each column, allowing for flex layout.
           */
          <div key={column.id} className="flex flex-col">
            {/*
             * Column Header
             * Displays the column title and the number of tasks in that column.
             * Includes a button to potentially add new tasks to this column.
             */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {tasks.length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/*
             * Task List Container
             * This div holds all the task cards for the current column.
             * It enables vertical scrolling if the number of tasks exceeds the container height.
             */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {/*
               * Task Card Mapping
               * Iterates over the tasks within the current column to render individual task cards.
               */}
              {tasks.map((task) => (
                /*
                 * Individual Task Card
                 * Displays task details and provides visual feedback for overdue tasks.
                 * The border color changes if the task is overdue.
                 */
                <Card
                  key={task.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    isOverdue(task.dueDate, task.status) ? "border-destructive/50" : ""
                  }`}
                >
                  {/*
                   * Card Header
                   * Contains the task title and its priority badge.
                   */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs ml-2">
                        <Flag className="mr-1 h-2 w-2" />
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  {/*
                   * Card Content
                   * Displays the task description, due date, estimated/completed hours, project, and assignee.
                   * Also includes a progress bar for in-progress tasks and an "Overdue" badge if applicable.
                   */}
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

                    <div className="space-y-2">
                      {/* Due Date Information */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Due {task.dueDate}</span>
                        {isOverdue(task.dueDate, task.status) && (
                          <Badge variant="destructive" className="text-xs ml-1">
                            Overdue
                          </Badge>
                        )}
                      </div>

                      {/* Estimated vs. Completed Hours */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {task.completedHours}h / {task.estimatedHours}h
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Project Badge */}
                      <Badge variant="outline" className="text-xs">
                        {task.project}
                      </Badge>
                      {/* Assignee Information */}
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {/* Progress Bar for In-Progress Tasks */}
                    {task.status === "in-progress" && (
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(task.completedHours / task.estimatedHours) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* No Tasks Message */}
              {tasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">No tasks in this column</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
