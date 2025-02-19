'use client'

import { useRouter, usePathname } from 'next/navigation'
import {
    UserCircleIcon,
    SunIcon,
    MoonIcon,
    TableCellsIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const { setDarkMode } = useEmployeeStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDarkMode = theme === 'dark'

    const handleThemeToggle = () => {
        const newTheme = isDarkMode ? 'light' : 'dark'
        setTheme(newTheme)
        setDarkMode(!isDarkMode)
    }

    const isTableView = pathname === '/employees/table'

    const handleViewToggle = () => {
        router.push(isTableView ? '/employees/card' : '/employees/table')
    }

    if (!mounted) {
        return null
    }

    return (
        <nav
            suppressHydrationWarning
            className={cn(
                'sticky top-0 z-40 w-full border-b transition-colors duration-200',
                isDarkMode
                    ? 'bg-gray-900 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
            )}
        >
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="pl-12 md:pl-0 shrink-0">
                        <h1
                            className={cn(
                                'text-sm md:text-xl font-bold',
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            )}
                        >
                            Employee Management
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleViewToggle}
                            className={cn(
                                'hover:bg-transparent',
                                isDarkMode
                                    ? 'text-gray-200 hover:text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            )}
                        >
                            {isTableView ? (
                                <Squares2X2Icon className="h-5 w-5" />
                            ) : (
                                <TableCellsIcon className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleThemeToggle}
                            className={cn(
                                'hover:bg-transparent',
                                isDarkMode
                                    ? 'text-gray-200 hover:text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            )}
                        >
                            {isDarkMode ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </Button>
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <UserCircleIcon className="h-8 w-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
