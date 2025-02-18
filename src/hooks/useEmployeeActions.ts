import { useState } from 'react'
import { useEmployeeStore } from '@/lib/store'
import {
    EmployeeActions,
    FormState,
    DeleteConfirmState
} from '../features/employees/types'

export const useEmployeeActions = () => {
    const [formState, setFormState] = useState<FormState>({
        isOpen: false,
        selectedEmployee: undefined
    })

    const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>({
        isOpen: false,
        employeeId: undefined,
        isDeleting: false
    })

    const { addEmployee, updateEmployee, deleteEmployee } = useEmployeeStore()

    const employeeActions: EmployeeActions = {
        onAdd: async (data) => {
            await addEmployee(data)
            setFormState((prev) => ({ ...prev, isOpen: false }))
        },

        onUpdate: async (id, data) => {
            await updateEmployee(id, data)
            setFormState({ isOpen: false, selectedEmployee: undefined })
        },

        onDelete: async (id) => {
            setDeleteConfirm({
                isOpen: true,
                employeeId: id,
                isDeleting: false
            })
        }
    }

    const handleConfirmDelete = async () => {
        if (!deleteConfirm.employeeId || deleteConfirm.isDeleting) return

        try {
            setDeleteConfirm((prev) => ({ ...prev, isDeleting: true }))
            await deleteEmployee(deleteConfirm.employeeId)
            setDeleteConfirm({
                isOpen: false,
                employeeId: undefined,
                isDeleting: false
            })
        } catch (error) {
            setDeleteConfirm((prev) => ({ ...prev, isDeleting: false }))
            // Handle error if needed
        }
    }

    const handleCancelDelete = () => {
        setDeleteConfirm({
            isOpen: false,
            employeeId: undefined,
            isDeleting: false
        })
    }

    return {
        formState,
        setFormState,
        deleteConfirm,
        setDeleteConfirm,
        employeeActions,
        handleConfirmDelete,
        handleCancelDelete
    }
}
