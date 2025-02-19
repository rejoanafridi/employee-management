import Image from 'next/image'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Employee } from '@/lib/schemas'
import { useEmployeeStore } from '@/stores/employeeStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { defaultAvatar } from '@/lib/constant'

interface EmployeeCardProps {
    employee: Employee
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
}

export default function EmployeeCard({
    employee,
    onEdit,
    onDelete
}: EmployeeCardProps) {
    const isDarkMode = useEmployeeStore((state) => state.isDarkMode)

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-lg shadow-xs transition-all duration-300 hover:shadow-lg',
                isDarkMode ? 'bg-gray-800' : 'bg-white',
                'transform hover:-translate-y-1'
            )}
        >
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 shrink-0">
                        <Image
                            src={employee.imageUrl || defaultAvatar}
                            alt={employee.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2
                            className={cn(
                                'text-lg font-medium truncate',
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            )}
                        >
                            {employee.name}
                        </h2>
                        <p
                            className={cn(
                                'text-sm',
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            )}
                        >
                            {employee.department}
                        </p>
                    </div>
                    <div className="flex space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(employee)}
                            className={cn(
                                'hover:bg-transparent',
                                isDarkMode
                                    ? 'text-blue-400 hover:text-blue-300'
                                    : 'text-blue-600 hover:text-blue-900'
                            )}
                        >
                            <PencilIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(employee.id!)}
                            className={cn(
                                'hover:bg-transparent',
                                isDarkMode
                                    ? 'text-red-400 hover:text-red-300'
                                    : 'text-red-600 hover:text-red-900'
                            )}
                        >
                            <TrashIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="mt-4 space-y-2">
                    <p
                        className={cn(
                            'text-sm',
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        )}
                    >
                        <span className="font-medium">Email:</span>{' '}
                        {employee.email}
                    </p>
                    <p
                        className={cn(
                            'text-sm',
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        )}
                    >
                        <span className="font-medium">Phone:</span>{' '}
                        {employee.phone}
                    </p>
                    <p
                        className={cn(
                            'text-sm',
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        )}
                    >
                        <span className="font-medium">Address:</span>{' '}
                        {employee.address}
                    </p>
                    <div className="flex items-center mt-2">
                        <span
                            className={cn(
                                'px-2 py-1 text-xs font-medium rounded-full',
                                employee.status === 'Active'
                                    ? isDarkMode
                                        ? 'bg-green-900 text-green-200'
                                        : 'bg-green-100 text-green-800'
                                    : isDarkMode
                                    ? 'bg-red-900 text-red-200'
                                    : 'bg-red-100 text-red-800'
                            )}
                        >
                            {employee.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
