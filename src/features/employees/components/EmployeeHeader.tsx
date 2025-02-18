'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface EmployeeHeaderProps {
    onAddClick: () => void
}

export const EmployeeHeader = ({ onAddClick }: EmployeeHeaderProps) => {
    const { theme } = useTheme()
    const isDarkMode = theme === 'dark'

    return (
        <div className="flex justify-between items-center mb-6">
            <h1
                className={cn(
                    'text-2xl font-semibold',
                    isDarkMode ? 'text-white' : 'text-gray-900'
                )}
            >
                Employees
            </h1>
            <Button
                onClick={onAddClick}
                variant="default"
                className="shadow-sm"
            >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Employee
            </Button>
        </div>
    )
}
