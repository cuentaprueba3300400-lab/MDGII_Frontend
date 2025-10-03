/*
 * This file defines the TasksManagement component, which serves as the main dashboard for managing tasks.
 * It integrates various sub-components like TasksList, TasksKanban, and CreateTaskDialog.
 * The component provides functionalities for filtering tasks, displaying task statistics, switching between list and Kanban views,
 * and initiating the creation of new tasks.
 */
"use client"

/*
 * React and UI Component Imports
 * These imports bring in necessary components from the UI library and React for building the user interface.
 */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/*
 * Local Component Imports
 * These imports bring in task-related components defined within the same application.
 */
import { TasksList } from "./tasks-list"
import { TasksKanban } from "./tasks-kanban"
import { CreateTaskDialog } from "./create-task-dialog"

/*
 * Icon Imports
 * These imports bring in icons from the 'lucide-react' library for visual representation within the UI.
 */
import { Plus, Search, Filter, Users, CheckSquare, Clock, AlertTriangle } from "lucide-react"

const mockTaskStats = [
  {
    title: "Total Tasks",
    value: "156",
    change: "+12 this week",
    icon: CheckSquare,
    color: "text-primary",
  },
  {
    title: "In Progress",
    value: "24",
    change: "+3 from yesterday",
    icon: Clock,
    color: "text-accent",
  },
  {
    title: "Completed Today",
    value: "8",
    change: "+2 from yesterday",
    icon: CheckSquare,
    color: "text-green-600",
  },
  {
    title: "Overdue",
    value: "5",
    change: "-1 from yesterday",
    icon: AlertTriangle,
    color: "text-destructive",
  },
]

/*
 * TasksManagement Component
 * This is the main component for the task management dashboard.
 * It manages the state for view toggling, search, and various filters.
 */
export function TasksManagement() {
  /*
   * State for current view (list or kanban)
   * Controls which task display component is rendered.
   */
  const [view, setView] = useState("list")
  /*
   * State for search term
   * Stores the user's input for filtering tasks by title or description.
   */
  const [searchTerm, setSearchTerm] = useState("")
  /*
   * State for status filter
   * Stores the selected status to filter tasks (e.g., "all", "todo", "in-progress").
   */
  const [statusFilter, setStatusFilter] = useState("all")
  /*
   * State for priority filter
   * Stores the selected priority to filter tasks (e.g., "all", "high", "medium").
   */
  const [priorityFilter, setPriorityFilter] = useState("all")
  /*
   * State for project filter
   * Stores the selected project to filter tasks.
   */
  const [projectFilter, setProjectFilter] = useState("all")
  /*
   * State for assignee filter
   * Stores the selected assignee to filter tasks.
   */
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  /*
   * State for controlling the visibility of the CreateTaskDialog.
   * When true, the dialog for creating a new task is open.
   */
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    /*
     * Main container for the Task Management dashboard.
     * Provides consistent spacing for all sections.
     */
    <div className="space-y-6">
      {/*
       * Header Section
       * Contains the main title, description, and the "New Task" button.
       */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Task Management</h1>
          <p className="text-muted-foreground text-pretty">Organize, track, and manage all your tasks efficiently</p>
        </div>
        {/* Button to open the Create Task Dialog */}
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/*
       * Task Statistics Grid
       * Displays key metrics about tasks using Card components.
       */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockTaskStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/*
       * Task Filters Section
       * Provides input fields and select dropdowns for filtering tasks.
       */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* Filter Dropdowns */}
        <div className="flex gap-2 flex-wrap">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          {/* Project Filter */}
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="website-redesign">Website Redesign</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="marketing">Marketing Campaign</SelectItem>
            </SelectContent>
          </Select>
          {/* Assignee Filter */}
          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-[140px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
              <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
              <SelectItem value="lisa-chen">Lisa Chen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/*
       * View Toggle (List/Kanban) and Content Display
       * Uses Tabs component to switch between different task views.
       */}
      <Tabs value={view} onValueChange={setView} className="space-y-4">
        {/* Tab List for View Selection */}
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
        </TabsList>

        {/* Content for List View */}
        <TabsContent value="list">
          <TasksList
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            projectFilter={projectFilter}
            assigneeFilter={assigneeFilter}
          />
        </TabsContent>

        {/* Content for Kanban Board View */}
        <TabsContent value="kanban">
          <TasksKanban
            searchTerm={searchTerm}
            priorityFilter={priorityFilter}
            projectFilter={projectFilter}
            assigneeFilter={assigneeFilter}
          />
        </TabsContent>
      </Tabs>

      {/* Create Task Dialog */}
      <CreateTaskDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
