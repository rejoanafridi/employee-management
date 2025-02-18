import { Skeleton } from '@/components/ui/skeleton'

export const EmployeeCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
            {/* Header with avatar and name */}
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-2/3" /> {/* Icon */}
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-2/3" /> {/* Icon */}
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>

            {/* Department and Role */}
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" /> {/* Icon */}
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" /> {/* Icon */}
                    <Skeleton className="h-4 w-36" />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-2">
                <Skeleton className="h-9 w-20 rounded-md" /> {/* Edit button */}
                <Skeleton className="h-9 w-20 rounded-md" />{' '}
                {/* Delete button */}
            </div>
        </div>
    )
}
