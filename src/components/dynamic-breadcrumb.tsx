"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function DynamicBreadcrumb() {
  const pathname = usePathname()

  const getBreadcrumbItems = () => {
    const pathMap: { [key: string]: { title: string; href?: string }[] } = {
      '/': [{ title: 'Dashboard' }],
      '/dashboard': [{ title: 'Dashboard' }],
      '/styles/portraits': [
        { title: 'Styles', href: '/styles' },
        { title: 'Portraits' }
      ],
      '/styles/anime': [
        { title: 'Styles', href: '/styles' },
        { title: 'Anime' }
      ],
      '/styles/3d-avatars': [
        { title: 'Styles', href: '/styles' },
        { title: '3D Avatars' }
      ],
      '/styles/professional': [
        { title: 'Styles', href: '/styles' },
        { title: 'Professional' }
      ],
      '/styles/cartoon': [
        { title: 'Styles', href: '/styles' },
        { title: 'Cartoon' }
      ],
      '/styles/abstract': [
        { title: 'Styles', href: '/styles' },
        { title: 'Abstract' }
      ],
      '/creations': [{ title: 'My Creations' }],
      '/creations/favorites': [
        { title: 'My Creations', href: '/creations' },
        { title: 'Favorites' }
      ],
      '/creations/history': [
        { title: 'My Creations', href: '/creations' },
        { title: 'History' }
      ],
      '/credits/buy': [
        { title: 'Credits', href: '/credits' },
        { title: 'Buy Credits' }
      ],
      '/credits/usage': [
        { title: 'Credits', href: '/credits' },
        { title: 'Usage' }
      ],
      '/credits/plans': [
        { title: 'Credits', href: '/credits' },
        { title: 'Plans' }
      ],
      '/settings/profile': [
        { title: 'Settings', href: '/settings' },
        { title: 'Profile' }
      ],
      '/settings/upload': [
        { title: 'Settings', href: '/settings' },
        { title: 'Upload' }
      ],
      '/settings/notifications': [
        { title: 'Settings', href: '/settings' },
        { title: 'Notifications' }
      ]
    }

    return pathMap[pathname] || [{ title: 'Dashboard' }]
  }

  const breadcrumbItems = getBreadcrumbItems()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">
            TwinkleFace
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>
                  {item.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}