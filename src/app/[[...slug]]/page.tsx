"use client"

import DashboardContent from "@/components/sections/dashboard"
import HomeContent from "@/components/sections/home"
import PortraitsContent from "@/components/sections/styles/portraits"
import AnimeContent from "@/components/sections/styles/anime"
import ThreeDContent from "@/components/sections/styles/3d-avatars"
import ProfessionalContent from "@/components/sections/styles/professional"
import CartoonContent from "@/components/sections/styles/cartoon"
import AbstractContent from "@/components/sections/styles/abstract"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

function MainContent() {
  const pathname = usePathname()
  
  // Initialize with correct page immediately based on pathname
  const getPageFromPath = (path: string): string => {
    const pathToPage: { [key: string]: string } = {
      '/': 'home',  // Root path goes to home
      '/dashboard': 'dashboard',
      '/styles/portraits': 'styles-portraits',
      '/styles/anime': 'styles-anime',
      '/styles/3d-avatars': 'styles-3d',
      '/styles/professional': 'styles-professional',
      '/styles/cartoon': 'styles-cartoon',
      '/styles/abstract': 'styles-abstract',
      '/creations': 'creations-all',
      '/creations/favorites': 'creations-favorites',
      '/creations/history': 'creations-history',
      '/credits/buy': 'credits-buy',
      '/credits/usage': 'credits-usage',
      '/credits/plans': 'credits-plans',
      '/settings/profile': 'settings-profile',
      '/settings/upload': 'settings-upload',
      '/settings/notifications': 'settings-notifications'
    }
    return pathToPage[path] || 'dashboard'
  }
  
  const [selectedPage, setSelectedPage] = useState(() => getPageFromPath(pathname))

  // Update selected page when pathname changes
  useEffect(() => {
    const newPage = getPageFromPath(pathname)
    setSelectedPage(newPage)
  }, [pathname])

  // For home page, don't show sidebar
  if (selectedPage === "home") {
    return <HomeContent />
  }

  // Show all other pages with sidebar
  return (
    <SidebarProvider>
      <SidebarContent selectedPage={selectedPage} />
    </SidebarProvider>
  )
}

function SidebarContent({ selectedPage }: { selectedPage: string }) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return <DashboardContent isCollapsed={isCollapsed} />

      // 🎨 Styles
      case "styles-portraits":
        return <PortraitsContent isCollapsed={isCollapsed} />
      case "styles-anime":
        return <AnimeContent isCollapsed={isCollapsed} />
      case "styles-3d":
        return <ThreeDContent isCollapsed={isCollapsed} />
      case "styles-professional":
        return <ProfessionalContent isCollapsed={isCollapsed} />
      case "styles-cartoon":
        return <CartoonContent isCollapsed={isCollapsed} />
      case "styles-abstract":
        return <AbstractContent isCollapsed={isCollapsed} />

      // // My Creations
      // case "creations-all":
      //   return <AllCreations />
      // case "creations-favorites":
      //   return <FavoriteCreations />
      // case "creations-history":
      //   return <HistoryCreations />

      // // Credits
      // case "credits-buy":
      //   return <BuyCredits />
      // case "credits-usage":
      //   return <UsageCredits />
      // case "credits-plans":
      //   return <PlansCredits />

      // // ⚙️ Settings
      // case "settings-profile":
      //   return <ProfileSettings />
      // case "settings-upload":
      //   return <UploadSettings />
      // case "settings-notifications":
      //   return <NotificationSettings />

      default:
        return <DashboardContent isCollapsed={isCollapsed} />
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderContent()}
        </div>
      </SidebarInset>
    </>
  )
}

export default function CatchAllPage() {
  return <MainContent />
}