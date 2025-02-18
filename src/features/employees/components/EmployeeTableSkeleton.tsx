import { Skeleton } from '@/components/ui/skeleton'

export const EmployeeTableSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
            {/* Rows */}
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-3 w-1/4" />
                        </div>
                        <div className="flex space-x-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
