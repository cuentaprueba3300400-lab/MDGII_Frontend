/*
 * reports-generator.tsx
 * This component provides a comprehensive interface for generating, viewing, and managing various reports and analytics within the application.
 * It allows users to select from predefined report templates, configure report parameters such as name, date range, projects, and teams,
 * and choose an output format. It also displays recently generated reports and allows for scheduling future reports.
 */
"use client"

/* React and UI Component Imports */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
/* Icon Imports */
import {
  FileText,
  Download,
  CalendarIcon,
  BarChart3,
  Clock,
  Target,
  FileSpreadsheet,
  FilePen as FilePdf,
} from "lucide-react"
/* Utility Imports */
import { format } from "date-fns"
import { cn } from "@/lib/utils"

/*
 * Defines an array of predefined report templates available to the user.
 * Each template includes an ID, name, description, category, estimated generation time, and a list of included data points.
 */
const reportTemplates = [
  {
    id: "project-summary",
    name: "Project Summary Report",
    description: "Comprehensive overview of project status, progress, and key metrics",
    category: "Project Management",
    estimatedTime: "2-3 minutes",
    includes: ["Project status", "Task completion", "Team performance", "Budget tracking"],
  },
  {
    id: "team-performance",
    name: "Team Performance Report",
    description: "Individual and team productivity metrics and analysis",
    category: "Team Analytics",
    estimatedTime: "3-4 minutes",
    includes: ["Individual metrics", "Team efficiency", "Task velocity", "Quality scores"],
  },
  {
    id: "time-tracking",
    name: "Time Tracking Report",
    description: "Detailed time allocation and productivity analysis",
    category: "Time Management",
    estimatedTime: "1-2 minutes",
    includes: ["Hours logged", "Time distribution", "Productivity trends", "Overtime analysis"],
  },
  {
    id: "budget-analysis",
    name: "Budget Analysis Report",
    description: "Financial overview and budget utilization across projects",
    category: "Financial",
    estimatedTime: "2-3 minutes",
    includes: ["Budget vs actual", "Cost breakdown", "Resource costs", "ROI analysis"],
  },
]

/*
 * Defines an array of mock data representing recently generated reports.
 * In a real application, this data would be fetched from a backend service.
 * Each report includes an ID, name, type, generation date, status, and size.
 */
const recentReports = [
  {
    id: "1",
    name: "Q4 Project Summary",
    type: "Project Summary Report",
    generatedDate: "2024-01-08",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "December Team Performance",
    type: "Team Performance Report",
    generatedDate: "2024-01-05",
    status: "completed",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Weekly Time Analysis",
    type: "Time Tracking Report",
    generatedDate: "2024-01-03",
    status: "completed",
    size: "956 KB",
  },
]

export function ReportsGenerator() {
  /* State management for report generation parameters */
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportName, setReportName] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [outputFormat, setOutputFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  /*
   * Handles the report generation process.
   * Simulates an asynchronous operation and logs the report parameters.
   * Sets `isGenerating` to true during the process and back to false upon completion.
   */
  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      console.log("Report generated:", {
        template: selectedTemplate,
        name: reportName,
        dateRange,
        projects: selectedProjects,
        teams: selectedTeams,
        format: outputFormat,
      })
    }, 3000)
  }

  /* Mock data for available projects and teams, would typically come from an API */
  const projects = ["Website Redesign", "Mobile App Development", "Marketing Campaign", "Infrastructure Upgrade"]
  const teams = ["Frontend", "Backend", "Design", "QA", "DevOps", "Marketing"]

  return (
    /* Main container for the Reports & Analytics page, providing consistent spacing */
    <div className="space-y-6">
      /* Header section with page title, description, and a button to view all reports */
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reports & Analytics</h1>
          <p className="text-muted-foreground text-pretty">
            Generate comprehensive reports and export data for analysis
          </p>
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View All Reports
        </Button>
      </div>

      /* Tabs component for navigating between report generation, recent reports, and scheduled reports sections */
      <Tabs defaultValue="generate" className="space-y-4">
        /* List of tab triggers */
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          /* Grid layout for report generation sections */
          <div className="grid gap-6 md:grid-cols-2">
            /* Report Templates Card: Allows users to select a predefined report template */
            <Card>
              <CardHeader>
                <CardTitle>Select Report Template</CardTitle>
                <CardDescription>Choose from pre-built report templates or create a custom report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-colors",
                      selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:bg-muted/50",
                    )}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimatedTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.includes.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            /* Report Configuration Card: Allows users to customize report parameters */
            <Card>
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>Customize your report parameters and filters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                /* Input field for the report name */
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    placeholder="Enter report name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>

                /* Date range selection for the report */
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    /* Popover for selecting the start date */
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "PPP") : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    /* Popover for selecting the end date */
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !dateRange.to && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "PPP") : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                /* Project selection checkboxes */
                <div className="space-y-2">
                  <Label>Projects</Label>
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div key={project} className="flex items-center space-x-2">
                        <Checkbox
                          id={project}
                          checked={selectedProjects.includes(project)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProjects([...selectedProjects, project])
                            } else {
                              setSelectedProjects(selectedProjects.filter((p) => p !== project))
                            }
                          }}
                        />
                        <Label htmlFor={project} className="text-sm">
                          {project}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                /* Team selection checkboxes */
                <div className="space-y-2">
                  <Label>Teams</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {teams.map((team) => (
                      <div key={team} className="flex items-center space-x-2">
                        <Checkbox
                          id={team}
                          checked={selectedTeams.includes(team)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTeams([...selectedTeams, team])
                            } else {
                              setSelectedTeams(selectedTeams.filter((t) => t !== team))
                            }
                          }}
                        />
                        <Label htmlFor={team} className="text-sm">
                          {team}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                /* Output format selection dropdown */
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        <div className="flex items-center gap-2">
                          <FilePdf className="h-4 w-4" />
                          PDF Document
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          Excel Spreadsheet
                        </div>
                      </SelectItem>
                      <SelectItem value="csv">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          CSV File
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                /* Button to trigger report generation */
                <Button
                  onClick={handleGenerateReport}
                  disabled={!selectedTemplate || !reportName || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        /* Content for the "Recent Reports" tab, displaying a list of previously generated reports */
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Download and manage your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>Generated {report.generatedDate}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Completed</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        /* Content for the "Scheduled Reports" tab, allowing users to set up recurring report generation */
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Set up automatic report generation on a recurring schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">No scheduled reports configured yet.</p>
                <Button className="mt-4">
                  <Target className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
