'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import SearchInput from './SearchInput'
import { useEmployeeStore } from '@/lib/store'

interface EmployeeHeaderProps {
    onAddClick: () => void
}

export const EmployeeHeader = ({ onAddClick }: EmployeeHeaderProps) => {
    const { theme } = useTheme()
    const isDarkMode = theme === 'dark'
    const { setSearchQuery } = useEmployeeStore()

    return (
        <div className="flex justify-between gap-4 flex-wrap items-center mb-6">
            <h1
                className={cn(
                    'text-2xl font-semibold',
                    isDarkMode ? 'text-white' : 'text-gray-900'
                )}
            >
                Employees
            </h1>
            <div className="flex items-center gap-4">
                <SearchInput onSearch={setSearchQuery} />
                <Button
                    onClick={onAddClick}
                    variant="default"
                    className="shadow-sm"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    <p className="md:hidden">Add</p>

                    <p className="hidden md:block">Add Employee</p>
                </Button>
            </div>
        </div>
    )
}
