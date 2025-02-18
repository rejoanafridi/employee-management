import { Employee } from '@/lib/schemas'
import EmployeeCard from '@/components/card-view/EmployeeCard'
import { EmployeeCardSkeleton } from './EmployeeCardSkeleton'

interface EmployeeCardViewProps {
    employees: Employee[]
    isLoading: boolean
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
}

export const EmployeeCardView = ({
    employees,
    isLoading,
    onEdit,
    onDelete
}: EmployeeCardViewProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <EmployeeCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employees.map((employee) => (
                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onEdit={() => onEdit(employee)}
                    onDelete={() => onDelete(employee.id!)}
                />
            ))}
        </div>
    )
}
