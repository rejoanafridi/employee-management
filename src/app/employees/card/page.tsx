'use client'

import { useEffect } from 'react'
import { useEmployeeStore } from '@/stores/employeeStore'
import { ErrorDisplay } from '@/features/employees/components/ErrorDisplay'
import { EmployeeHeader } from '@/features/employees/components/EmployeeHeader'
import { EmployeeCardView } from '@/features/employees/components/EmployeeCardView'
import { useEmployeeActions } from '@/hooks/useEmployeeActions'
import EmployeeForm from '@/components/form/EmployeeForm'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function CardView() {
    const {
        formState,
        setFormState,
        deleteConfirm,
        employeeActions,
        handleConfirmDelete,
        handleCancelDelete
    } = useEmployeeActions()

    const { filteredEmployees, isLoading, error, isDarkMode, fetchEmployees } =
        useEmployeeStore()

    useEffect(() => {
        fetchEmployees()
    }, [fetchEmployees])
    if (error)
        return (
            <ErrorDisplay
                error={error}
                isDarkMode={isDarkMode}
                onRetry={fetchEmployees}
            />
        )

    return (
        <div className={`py-6 ${isDarkMode ? 'text-white' : ''}`}>
            <div className="px-4 sm:px-6 lg:px-8">
                <EmployeeHeader
                    onAddClick={() =>
                        setFormState({
                            isOpen: true,
                            selectedEmployee: undefined
                        })
                    }
                />

                <EmployeeCardView
                    isLoading={isLoading}
                    employees={filteredEmployees}
                    onEdit={(employee) =>
                        setFormState({
                            isOpen: true,
                            selectedEmployee: employee
                        })
                    }
                    onDelete={employeeActions.onDelete}
                />

                {formState.isOpen && (
                    <EmployeeForm
                        employee={formState.selectedEmployee}
                        onSubmit={
                            formState.selectedEmployee
                                ? (data) =>
                                      employeeActions.onUpdate(
                                          formState.selectedEmployee!.id!,
                                          data
                                      )
                                : employeeActions.onAdd
                        }
                        onClose={() =>
                            setFormState({
                                isOpen: false,
                                selectedEmployee: undefined
                            })
                        }
                    />
                )}

                <ConfirmDialog
                    isOpen={deleteConfirm.isOpen}
                    title="Delete Employee"
                    message="Are you sure you want to delete this employee? This action cannot be undone."
                    confirmLabel={
                        deleteConfirm.isDeleting ? 'Deleting...' : 'Delete'
                    }
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    confirmDisabled={deleteConfirm.isDeleting}
                />
            </div>
        </div>
    )
}
