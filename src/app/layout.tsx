'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { useEmployeeStore } from '@/stores/employeeStore'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { isDarkMode, isSidebarOpen } = useEmployeeStore()

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} bg-background`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme={isDarkMode ? 'dark' : 'light'}
                    enableSystem={false}
                    storageKey="employee-theme"
                    forcedTheme={isDarkMode ? 'dark' : 'light'}
                >
                    <div className="min-h-screen">
                        <Navbar />
                        <Sidebar />
                        <main
                            className={cn('flex-1', {
                                'lg:pl-64': !isSidebarOpen,
                                'lg:pl-8': isSidebarOpen
                            })}
                        >
                            <div className="py-6">
                                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
