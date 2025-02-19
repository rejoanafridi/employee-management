import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Employee } from '../lib/schemas'

interface EmployeeStore {
    employees: Employee[]
    filteredEmployees: Employee[]
    isLoading: boolean
    error: string | null
    searchQuery: string
    selectedDepartment: string | null
    isDarkMode: boolean
    viewMode: 'card' | 'table'
    isSidebarOpen: boolean
    setSearchQuery: (query: string) => void
    setSelectedDepartment: (department: string | null) => void
    setDarkMode: (isDark: boolean) => void
    setViewMode: (mode: 'card' | 'table') => void
    fetchEmployees: () => Promise<void>
    addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>
    updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>
    deleteEmployee: (id: string) => Promise<void>
    toggleSidebar: () => void
}

// Mock data for initial development
const mockEmployees: Employee[] = [
    {
        id: '1',
        name: 'Rejoan Islam',
        email: 'rejoanislam.cse@gmail.com',
        phone: '01641585416',
        address: 'Mirpur, Dhaka',
        department: 'Software Engineer',
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
            filteredEmployees: [],
            isLoading: false,
            error: null,
            searchQuery: '',
            selectedDepartment: null,
            isDarkMode: false,
            viewMode: 'card',
            isSidebarOpen: false,

            setSearchQuery: (query) => {
                set({ searchQuery: query })

                // Perform filtering
                const filtered = get().employees.filter((emp) =>
                    emp.name.toLowerCase().includes(query.toLowerCase())
                )

                set({ filteredEmployees: filtered })
            },

            setEmployees: (data: Employee[]) => {
                set({ employees: data, filteredEmployees: data })
            },

            setSelectedDepartment: (department) =>
                set({ selectedDepartment: department }),

            setDarkMode: (isDark) => set({ isDarkMode: isDark }),

            setViewMode: (mode) => set({ viewMode: mode }),

            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

            fetchEmployees: async () => {
                try {
                    set({ isLoading: true })

                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    const storedEmployees = get().employees
                    if (storedEmployees.length > 0) {
                        set({
                            filteredEmployees: storedEmployees,
                            isLoading: false
                        })
                        return
                    }

                    set({
                        employees: mockEmployees,
                        filteredEmployees: mockEmployees,
                        isLoading: false
                    })
                } catch (error) {
                    set({
                        error: `Failed to fetch employees ${error}`,
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
                        filteredEmployees: [...state.employees, newEmployee],
                        isLoading: false,
                        error: null
                    }))
                } catch (error) {
                    set({
                        error: `Failed to add employee ${error}`,
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
                        filteredEmployees: state.filteredEmployees.map((emp) =>
                            emp.id === id ? { ...emp, ...employee } : emp
                        ),
                        isLoading: false,
                        error: null
                    }))
                } catch (error) {
                    set({
                        error: `Failed to update employee ${error}`,
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
                        filteredEmployees: state.filteredEmployees.filter(
                            (emp) => emp.id !== id
                        ),
                        error: null
                    }))
                } catch (error) {
                    set({
                        error: `Failed to delete employee ${error}`
                    })
                }
            }
        }),
        {
            name: 'employee-store',
            partialize: (state) => ({
                employees: state.employees,
                isDarkMode: state.isDarkMode,
                viewMode: state.viewMode
            })
        }
    )
)
