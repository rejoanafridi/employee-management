import { Employee } from '@/lib/schemas'

export interface EmployeeActions {
    onAdd: (data: Omit<Employee, 'id'>) => Promise<void>
    onUpdate: (id: string, data: Omit<Employee, 'id'>) => Promise<void>
    onDelete: (id: string) => Promise<void>
}

export interface FormState {
    isOpen: boolean
    selectedEmployee: Employee | undefined
}

export interface DeleteConfirmState {
    isOpen: boolean
    employeeId: string | undefined
    isDeleting: boolean
}
