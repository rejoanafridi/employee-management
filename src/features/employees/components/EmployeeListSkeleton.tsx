import { useEmployeeStore } from '@/lib/store'
import { EmployeeCardSkeleton } from './EmployeeCardSkeleton'
import { EmployeeTableSkeleton } from './EmployeeTableSkeleton'

export const EmployeeListSkeleton = () => {
    const viewMode = useEmployeeStore((state) => state.viewMode)

    if (viewMode === 'table') {
        return <EmployeeTableSkeleton />
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <EmployeeCardSkeleton key={index} />
            ))}
        </div>
    )
}
