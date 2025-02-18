'use client'
import { useEffect } from 'react'
import { useEmployeeStore } from '@/lib/store'
import { ErrorDisplay } from '@/features/employees/components/ErrorDisplay'
import { EmployeeHeader } from '@/features/employees/components/EmployeeHeader'
import { EmployeeList } from '@/features/employees/components/EmployeeList'
import {} from '@/features/employees/components/EmployeeListSkeleton'
import { useEmployeeActions } from '@/features/employees/hooks/useEmployeeActions'
import EmployeeForm from '@/components/form/EmployeeForm'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function EmployeesPage() {
    const {
        formState,
        setFormState,
        deleteConfirm,
        employeeActions,
        handleConfirmDelete,
        handleCancelDelete
    } = useEmployeeActions()

    const { employees, error, isDarkMode, viewMode, fetchEmployees } =
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <EmployeeHeader
                    onAddClick={() =>
                        setFormState({
                            isOpen: true,
                            selectedEmployee: undefined
                        })
                    }
                />

                <EmployeeList
                    viewMode={viewMode}
                    employees={employees}
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
