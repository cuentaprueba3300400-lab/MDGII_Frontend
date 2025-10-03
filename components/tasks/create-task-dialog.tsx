/*
 * create-task-dialog.tsx
 *
 * This component defines a dialog for creating new tasks within the application.
 * It provides a comprehensive form for users to input various task details,
 * including title, description, priority, status, associated project, assignee,
 * estimated hours, due date, tags, and dependencies.
 *
 * The dialog manages its own form state and handles the submission process,
 * including a simulated API call for task creation. It leverages several
 * UI components from a custom library (e.g., Button, Dialog, Input, Select, etc.)
 * to construct an intuitive and interactive user experience.
 */

"use client"

/* React and UI Component Imports */
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

/* Icon Imports */
import { CalendarIcon, X } from "lucide-react"

/* Utility Imports */
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateTaskDialogProps {
  /* Controls the visibility of the dialog. */
  open: boolean
  /* Callback function to update the open state of the dialog. */
  onOpenChange: (open: boolean) => void
}

/*
 * CreateTaskDialog Component
 *
 * A functional component that renders a dialog for creating new tasks.
 * It manages the form state, handles user input, and simulates task creation.
 *
 * @param {CreateTaskDialogProps} { open, onOpenChange } - Props to control dialog visibility.
 * @returns {JSX.Element} The create task dialog component.
 */
export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  /*
   * State for managing the form data.
   * @property {string} title - The title of the task.
   * @property {string} description - A detailed description of the task.
   * @property {string} priority - The priority level of the task (e.g., "low", "medium", "high", "critical").
   * @property {string} status - The current status of the task (e.g., "todo", "in-progress", "review", "completed").
   * @property {string} project - The project associated with the task.
   * @property {string} assignee - The person assigned to the task.
   * @property {string} estimatedHours - The estimated hours for completing the task.
   * @property {Date | undefined} dueDate - The due date of the task, or undefined if not set.
   * @property {string[]} tags - An array of tags associated with the task.
   * @property {string[]} dependencies - An array of task dependencies.
   */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "todo",
    project: "",
    assignee: "",
    estimatedHours: "",
    dueDate: undefined as Date | undefined,
    tags: [] as string[],
    dependencies: [] as string[],
  })
  /* State for the new tag input field. */
  const [newTag, setNewTag] = useState("")
  /* State to indicate if the task creation is in progress. */
  const [isLoading, setIsLoading] = useState(false)

  /*
   * Handles the form submission.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate task creation
    setTimeout(() => {
      console.log("Creating task:", formData)
      setIsLoading(false)
      onOpenChange(false)
      // Reset form
      setFormData({
        title: "",
        description: "",
        priority: "",
        status: "todo",
        project: "",
        assignee: "",
        estimatedHours: "",
        dueDate: undefined,
        tags: [],
        dependencies: [],
      })
    }, 1000)
  }

  /*
   * Updates a specific field in the form data.
   * @param {string} field - The name of the field to update.
   * @param {any} value - The new value for the field.
   */
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  /*
   * Adds a new tag to the formData if it's not empty and not already present.
   */
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      updateFormData("tags", [...formData.tags, newTag.trim()])
      setNewTag("")
    }
  }

  /*
   * Removes a tag from the formData.
   * @param {string} tagToRemove - The tag to be removed.
   */
  const removeTag = (tagToRemove: string) => {
    updateFormData(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  /*
   * Handles key press events, specifically for adding tags on Enter key press.
   * @param {React.KeyboardEvent} e - The keyboard event.
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    /*
     * Dialog component for the task creation form.
     * Controls its open state via the `open` and `onOpenChange` props.
     */
    <Dialog open={open} onOpenChange={onOpenChange}>
      /*
       * DialogContent component to wrap the dialog's content.
       * Configured for a maximum width on small screens and vertical scrolling for overflow.
       */
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        /*
         * DialogHeader for the dialog's title and description.
         */
        <DialogHeader>
          /* DialogTitle displays the main title of the dialog. */
          <DialogTitle>Create New Task</DialogTitle>
          /* DialogDescription provides a brief explanation of the dialog's purpose. */
          <DialogDescription>Create a detailed task with all necessary information for your team.</DialogDescription>
        </DialogHeader>

        /*
         * Form element for task creation.
         * Uses `handleSubmit` for submission and organizes inputs with `space-y-4`.
         */
        <form onSubmit={handleSubmit} className="space-y-4">
          /*
           * Grid layout for task title and priority.
           * Arranges two input fields side-by-side with a gap of 4 units.
           */
          <div className="grid grid-cols-2 gap-4">
            /*
             * Container for the Task Title input.
             * Includes a Label and an Input component.
             */
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                required
              />
            </div>
            /*
             * Container for the Priority selection.
             * Includes a Label and a Select component with predefined options.
             */
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => updateFormData("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          /*
           * Container for the task description textarea.
           * Allows for detailed input about the task.
           */
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the task in detail"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              rows={3}
            />
          </div>

          /*
           * Grid layout for project and assignee selection.
           * Arranges two select fields side-by-side.
           */
          <div className="grid grid-cols-2 gap-4">
            /*
             * Container for the Project selection.
             * Includes a Label and a Select component with mock project options.
             */
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={formData.project} onValueChange={(value) => updateFormData("project", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website-redesign">Website Redesign</SelectItem>
                  <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                  <SelectItem value="marketing">Marketing Campaign</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure Upgrade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            /*
             * Container for the Assignee selection.
             * Includes a Label and a Select component with mock assignee options.
             */
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select value={formData.assignee} onValueChange={(value) => updateFormData("assignee", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                  <SelectItem value="lisa-chen">Lisa Chen</SelectItem>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          /*
           * Grid layout for task status and estimated hours.
           * Arranges two input fields side-by-side.
           */
          <div className="grid grid-cols-2 gap-4">
            /*
             * Container for the Status selection.
             * Includes a Label and a Select component with predefined status options.
             */
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => updateFormData("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            /*
             * Container for the Estimated Hours input.
             * Includes a Label and an Input component for numerical input.
             */
            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                placeholder="0"
                value={formData.estimatedHours}
                onChange={(e) => updateFormData("estimatedHours", e.target.value)}
              />
            </div>
          </div>

          /*
           * Container for the Due Date selection.
           * Uses a Popover to display a Calendar component for date selection.
           */
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dueDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) => updateFormData("dueDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          /*
           * Container for Tags management.
           * Allows users to add new tags and displays existing tags as badges.
           */
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag and press Enter"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          /*
           * Container for Dependencies selection.
           * Displays a list of checkboxes for selecting task dependencies.
           */
          <div className="space-y-2">
            <Label>Dependencies</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="dep1" />
                <Label htmlFor="dep1" className="text-sm">
                  User research analysis (Task #2)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dep2" />
                <Label htmlFor="dep2" className="text-sm">
                  Database schema design (Task #4)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dep3" />
                <Label htmlFor="dep3" className="text-sm">
                  API endpoint development (Task #3)
                </Label>
              </div>
            </div>
          </div>

          /*
           * DialogFooter for action buttons.
           * Contains a Cancel button and a Create Task button.
           */
          <DialogFooter>
            /* Button to cancel the task creation and close the dialog. */
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            /* Button to submit the form and create the task. It is disabled while the task is being created. */
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
