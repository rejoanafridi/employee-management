import { Employee } from '@/lib/schemas'
import TableView from '@/components/table-view/TableView'
import { EmployeeTableSkeleton } from './EmployeeTableSkeleton'

interface EmployeeListProps {
    employees: Employee[]
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
    isLoading: boolean
}

export const EmployeeList = ({
    employees,
    onEdit,
    onDelete,
    isLoading
}: EmployeeListProps) => {
    if (isLoading) {
        return <EmployeeTableSkeleton />
    }
    return (
        <TableView employees={employees} onEdit={onEdit} onDelete={onDelete} />
    )
}
