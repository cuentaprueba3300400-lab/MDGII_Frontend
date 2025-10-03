"use client"

// React and hooks imports
import type React from "react"
import { useState } from "react"

// UI component imports from a custom UI library (presumably Shadcn UI or similar)
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Icon imports from Lucide React library
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Users,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react"

// Defines the navigation links for the dashboard sidebar.
// Each object contains a name, href (route), and an icon component.
// Defines the navigation links for the dashboard sidebar.
// Each object contains a name, href (route), and an icon component.
const navigation = [
  // Dashboard link: Overview and main entry point.
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // Projects link: Manages various projects.
  { name: "Projects", href: "/projects", icon: FolderKanban },
  // Tasks link: Handles task management and assignments.
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  // Analytics & Gantt link: Provides data visualization and project scheduling.
  { name: "Analytics & Gantt", href: "/analytics", icon: BarChart3 },
  // Team link: Manages team members and collaborations.
  { name: "Team", href: "/team", icon: Users },
  // Logistics link: Specific section for logistics management.
  { name: "Logistics", href: "/logistics", icon: MapPin }, // Updated route name to match logistics page
  // Reports link: Generates and views various reports.
  { name: "Reports", href: "/reports", icon: BarChart3 }, // Added reports navigation
  // Settings link: Configures application settings.
  { name: "Settings", href: "/settings", icon: Settings },
]

// Defines the props for the DashboardLayout component.
interface DashboardLayoutProps {
  children: React.ReactNode // The content to be rendered within the layout.
}

/**
 * DashboardLayout component provides a consistent layout for the application's dashboard.
 * It includes a sidebar for navigation (responsive for mobile and desktop) and a top bar
 * with search, notifications, and user profile dropdown.
 *
 * @param {DashboardLayoutProps} { children } - React children to be rendered within the main content area.
 * @returns {JSX.Element} The DashboardLayout component.
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  // State to control the visibility of the mobile sidebar.
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {/* This div creates a fixed overlay that appears when the mobile sidebar is open. */}
      {/* It includes a backdrop for visual separation and a sidebar panel. */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        {/* Backdrop to close the sidebar when clicked outside. */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        {/* Mobile sidebar panel with navigation links. */}
        <div className="fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border shadow-xl">
          {" "}
          {/* Increased width and added shadow */}
          {/* Header section of the mobile sidebar with logo and close button. */}
          <div className="flex h-16 items-center justify-between px-6">
            {" "}
            {/* Increased padding */}
            <div className="flex items-center space-x-2">
              {/* ProjectFlow logo */}
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PF</span>
              </div>
              <h1 className="text-xl font-bold text-sidebar-primary">ProjectFlow</h1>
            </div>
            {/* Button to close the mobile sidebar. */}
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {/* Navigation section for mobile sidebar. */}
          <nav className="px-4 py-6">
            {" "}
            {/* Increased padding */}
            <ul className="space-y-1">
              {" "}
              {/* Reduced spacing for better mobile fit */}
              {/* Mapping through navigation items to create links. */}
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group" // Enhanced hover effects
                    onClick={() => setSidebarOpen(false)} // Close sidebar on navigation
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />{" "}
                    {/* Added hover animation */}
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      {/* This div represents the fixed sidebar visible on larger screens. */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:bg-sidebar lg:border-r lg:border-sidebar-border">
        {" "}
        {/* Increased width */}
        {/* Header section of the desktop sidebar with logo and project details. */}
        <div className="flex h-16 items-center px-6">
          {" "}
          {/* Increased padding */}
          <div className="flex items-center space-x-3">
            {" "}
            {/* Added logo and improved spacing */}
            {/* ProjectFlow logo */}
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold">PF</span>
            </div>
            {/* Project title and description. */}
            <div>
              <h1 className="text-xl font-bold text-sidebar-primary">ProjectFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Project Management</p>
            </div>
          </div>
        </div>
        {/* Navigation section for desktop sidebar. */}
        <nav className="px-4 py-6">
          {" "}
          {/* Increased padding */}
          <ul className="space-y-1">
            {/* Mapping through navigation items to create links. */}
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group" // Enhanced styling
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      {/* This div contains the top bar and the main content of the dashboard. */}
      <div className="lg:pl-72">
        {" "}
        {/* Updated to match new sidebar width */}
        {/* Top bar */}
        {/* Sticky header with search, notifications, and user profile. */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          {" "}
          {/* Added backdrop blur and transparency */}
          {/* Mobile sidebar toggle button. */}
          <Button variant="ghost" size="sm" className="lg:hidden hover:bg-accent" onClick={() => setSidebarOpen(true)}>
            {" "}
            {/* Enhanced mobile button */}
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Search input for desktop. */}
            <div className="hidden md:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, tasks..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            {/* Spacer for mobile layout. */}
            <div className="flex md:hidden flex-1" />

            {/* Right-hand side of the top bar: notifications and user dropdown. */}
            <div className="flex items-center gap-x-2 lg:gap-x-4">
              {" "}
              {/* Improved spacing */}
              {/* Mobile search button. */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              {/* Notifications button with badge. */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
              {/* User profile dropdown menu. */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent">
                    {" "}
                    {/* Enhanced button styling */}
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  {" "}
                  {/* Increased width */}
                  {/* User information in the dropdown. */}
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                      <Badge variant="secondary" className="w-fit mt-1 text-xs">
                        Project Manager
                      </Badge>{" "}
                      {/* Added role badge */}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Settings menu item. */}
                  <DropdownMenuItem className="cursor-pointer">
                    {" "}
                    {/* Added cursor pointer */}
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {/* Logout menu item. */}
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    {" "}
                    {/* Enhanced logout styling */}
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {/* Page content */}
        {/* Main content area where children components will be rendered. */}
        <main className="py-4 sm:py-6 lg:py-8">
          {" "}
          {/* Responsive padding */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {" "}
            {/* Added max width and centering */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}