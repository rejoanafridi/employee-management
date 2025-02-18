import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Employee } from './schemas'

interface EmployeeStore {
    employees: Employee[]
    isLoading: boolean
    error: string | null
    searchQuery: string
    selectedDepartment: string | null
    isDarkMode: boolean
    viewMode: 'card' | 'table'
    setSearchQuery: (query: string) => void
    setSelectedDepartment: (department: string | null) => void
    setDarkMode: (isDark: boolean) => void
    setViewMode: (mode: 'card' | 'table') => void
    fetchEmployees: () => Promise<void>
    addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>
    updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>
    deleteEmployee: (id: string) => Promise<void>
}

// Mock data for initial development
const mockEmployees: Employee[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St, City',
        department: 'Engineering',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '098-765-4321',
        address: '456 Oak St, Town',
        department: 'HR',
        status: 'Active'
    }
]

export const useEmployeeStore = create<EmployeeStore>()(
    persist(
        (set, get) => ({
            employees: [],
            isLoading: true,
            error: null,
            searchQuery: '',
            selectedDepartment: null,
            isDarkMode: false,
            viewMode: 'card',

            setSearchQuery: (query) => set({ searchQuery: query }),
            setSelectedDepartment: (department) =>
                set({ selectedDepartment: department }),
            setDarkMode: (isDark) => set({ isDarkMode: isDark }),
            setViewMode: (mode) => set({ viewMode: mode }),

            fetchEmployees: async () => {
                try {
                    if (!get().isLoading) {
                        set({ isLoading: true })
                    }

                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    set({
                        employees: mockEmployees,
                        isLoading: false,
                        error: null
                    })
                } catch (error) {
                    set({
                        error: 'Failed to fetch employees',
                        isLoading: false
                    })
                }
            },

            addEmployee: async (employee) => {
                try {
                    set({ isLoading: true })
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    const newEmployee = {
                        ...employee,
                        id: Math.random().toString(36).substr(2, 9)
                    }

                    set((state) => ({
                        employees: [...state.employees, newEmployee],
                        isLoading: false,
                        error: null
                    }))
                } catch (error) {
                    set({
                        error: 'Failed to add employee',
                        isLoading: false
                    })
                }
            },

            updateEmployee: async (id, employee) => {
                try {
                    set({ isLoading: true })
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    set((state) => ({
                        employees: state.employees.map((emp) =>
                            emp.id === id ? { ...emp, ...employee } : emp
                        ),
                        isLoading: false,
                        error: null
                    }))
                } catch (error) {
                    set({
                        error: 'Failed to update employee',
                        isLoading: false
                    })
                }
            },

            deleteEmployee: async (id) => {
                try {
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    set((state) => ({
                        employees: state.employees.filter(
                            (emp) => emp.id !== id
                        ),
                        error: null
                    }))
                } catch (error) {
                    set({
                        error: 'Failed to delete employee'
                    })
                }
            }
        }),
        {
            name: 'employee-store',
            partialize: (state) => ({
                isDarkMode: state.isDarkMode,
                viewMode: state.viewMode
            })
        }
    )
)
