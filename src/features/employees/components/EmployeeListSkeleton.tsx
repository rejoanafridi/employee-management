import { EmployeeCardSkeleton } from './EmployeeCardSkeleton'
import { EmployeeTableSkeleton } from './EmployeeTableSkeleton'

export const EmployeeCardSkeletons = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <EmployeeCardSkeleton key={index} />
            ))}
        </div>
    )
}
export const EmployeeListSkeletons = () => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <EmployeeTableSkeleton key={index} />
            ))}
        </div>
    )
}
