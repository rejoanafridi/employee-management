import { Employee } from '@/lib/schemas'
import TableView from '@/components/table-view/TableView'
import {} from '../types'

interface EmployeeListProps {
    viewMode: 'card' | 'table'
    employees: Employee[]
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
}

export const EmployeeList = ({
    employees,
    onEdit,
    onDelete
}: EmployeeListProps) => {
    return (
        <TableView employees={employees} onEdit={onEdit} onDelete={onDelete} />
    )
}
