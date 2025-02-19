'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
    Table,
    Menu,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useEmployeeStore } from '@/stores/employeeStore'

const navigation = [
    { name: 'Card View', href: '/employees/card', icon: LayoutGrid },
    { name: 'Table View', href: '/employees/table', icon: Table }
]

export default function Sidebar() {
    const { isSidebarOpen, toggleSidebar, isDarkMode } = useEmployeeStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div suppressHydrationWarning>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={cn(
                        'hover:bg-transparent  p-1',
                        isDarkMode
                            ? 'text-gray-200 hover:text-white'
                            : 'text-gray-600 hover:text-gray-900 bg-white'
                    )}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Desktop sidebar */}
            <div
                className={cn(
                    'hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col',
                    isSidebarOpen ? 'lg:w-16' : 'lg:w-64',
                    'transition-all duration-300'
                )}
            >
                <nav
                    className={cn(
                        'flex-1 flex flex-col min-h-0 pt-16',
                        isDarkMode
                            ? 'bg-gray-900 border-gray-700 text-white'
                            : 'bg-white border-gray-200',
                        'border-r'
                    )}
                >
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center justify-between px-4 mb-4">
                            {!isSidebarOpen && (
                                <h2
                                    className={cn(
                                        'text-lg font-semibold',
                                        isDarkMode
                                            ? 'text-white'
                                            : 'text-gray-900'
                                    )}
                                >
                                    Menu
                                </h2>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSidebar()}
                                className={cn(
                                    'hover:bg-transparent',
                                    isDarkMode
                                        ? 'text-gray-200 hover:text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                )}
                            >
                                {isSidebarOpen ? (
                                    <ChevronRight className="h-5 w-5" />
                                ) : (
                                    <ChevronLeft className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                        <div className="flex-1 px-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                        pathname === item.href
                                            ? isDarkMode
                                                ? 'bg-gray-800 text-white'
                                                : 'bg-blue-100 text-blue-600'
                                            : isDarkMode
                                            ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            'h-5 w-5',
                                            isSidebarOpen ? 'mr-0' : 'mr-3'
                                        )}
                                    />
                                    {!isSidebarOpen && <span>{item.name}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div
                        className={cn(
                            'fixed inset-y-0 left-0 flex w-64 flex-col pt-16',
                            isDarkMode ? 'bg-gray-900' : 'bg-white',
                            'transition-transform duration-300'
                        )}
                    >
                        <div className="flex-1 flex flex-col pt-5 pb-4">
                            <div className="flex-1 px-3 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className={cn(
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                            pathname === item.href
                                                ? isDarkMode
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-blue-100 text-blue-600'
                                                : isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 mr-3" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
