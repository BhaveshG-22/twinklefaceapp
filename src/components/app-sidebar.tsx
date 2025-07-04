"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  SquareTerminal,
  Bot,
  Settings2,
  ImageIcon,
  CreditCardIcon,
  GalleryVerticalEnd,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "TwinkleFace",
      logo: GalleryVerticalEnd,
      plan: "Creator",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Styles",
      url: "#",
      icon: Bot,
      items: [
        { title: "Portraits", url: "/styles/portraits" },
        { title: "Anime", url: "/styles/anime" },
        { title: "3D Avatars", url: "/styles/3d-avatars" },
        { title: "Professional", url: "/styles/professional" },
        { title: "Cartoon", url: "/styles/cartoon" },
        { title: "Abstract", url: "/styles/abstract" },
      ],
    },
    {
      title: "My Creations",
      url: "#",
      icon: ImageIcon, // use appropriate icon
      items: [
        { title: "All Images", url: "/creations" },
        { title: "Favorites", url: "/creations/favorites" },
        { title: "History", url: "/creations/history" },
      ],
    },
    {
      title: "Credits",
      url: "#",
      icon: CreditCardIcon, // use appropriate icon
      items: [
        { title: "Buy Credits", url: "/credits/buy" },
        { title: "Usage", url: "/credits/usage" },
        { title: "Plans", url: "/credits/plans" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/settings/profile" },
        { title: "Upload Preferences", url: "/settings/upload" },
        { title: "Notifications", url: "/settings/notifications" },
      ],
    },
  ],
  projects: [],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Update navigation items based on current route
  const navItemsWithActiveState = data.navMain.map(item => {
    if (item.items) {
      // Check if any sub-item matches current path
      const hasActiveSubItem = item.items.some(subItem => pathname === subItem.url)
      return {
        ...item,
        isActive: hasActiveSubItem
      }
    } else {
      // For items without sub-items, check direct match
      return {
        ...item,
        isActive: pathname === item.url
      }
    }
  })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItemsWithActiveState} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
