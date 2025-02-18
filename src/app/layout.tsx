'use client'
import type {} from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { useEmployeeStore } from '@/lib/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const isDarkMode = useEmployeeStore((state) => state.isDarkMode)

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
                    suppressHydrationWarning
                >
                    <div className="min-h-screen">
                        <Navbar />
                        <Sidebar />
                        <main className="lg:pl-64 flex-1">
                            <div className="py-6">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
