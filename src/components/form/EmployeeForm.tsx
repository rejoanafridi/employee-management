'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Employee, employeeSchema } from '@/lib/schemas'
import { useEmployeeStore } from '@/stores/employeeStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface EmployeeFormProps {
    employee?: Employee
    onSubmit: (data: Omit<Employee, 'id'>) => Promise<void>
    onClose: () => void
}

const departments = [
    'Engineering',
    'HR',
    'Sales',
    'Marketing',
    'Finance'
] as const

export default function EmployeeForm({
    employee,
    onSubmit,
    onClose
}: EmployeeFormProps) {
    const isDarkMode = useEmployeeStore((state) => state.isDarkMode)

    const form = useForm<Omit<Employee, 'id'>>({
        resolver: zodResolver(employeeSchema.omit({ id: true })),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            department: 'Engineering',
            status: 'Active',
            address: '',
            imageUrl: ''
        }
    })

    useEffect(() => {
        if (employee) {
            const employeeData = {
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                department: employee.department,
                status: employee.status,
                address: employee.address,
                imageUrl: employee.imageUrl || ''
            }
            form.reset(employeeData)
        }
    }, [employee, form])

    const handleSubmit = async (data: Omit<Employee, 'id'>) => {
        try {
            await onSubmit(data)
            form.reset()
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div
                className={cn(
                    'relative w-full max-w-md rounded-lg p-6 shadow-lg',
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                )}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'absolute right-4 top-4',
                        isDarkMode
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-500 hover:text-gray-900'
                    )}
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>

                <h2
                    className={cn(
                        'mb-6 text-xl font-semibold',
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    )}
                >
                    {employee ? 'Edit Employee' : 'Add Employee'}
                </h2>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter employee name"
                                            className={cn(
                                                isDarkMode &&
                                                    'text-white placeholder:text-gray-400'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            className={cn(
                                                isDarkMode &&
                                                    'text-white placeholder:text-gray-400'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Phone
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter phone number"
                                            className={cn(
                                                isDarkMode &&
                                                    'text-white placeholder:text-gray-400'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Department
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className={cn(
                                                    isDarkMode &&
                                                        'text-white border-gray-700'
                                                )}
                                            >
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent
                                            className={cn(
                                                isDarkMode &&
                                                    'bg-gray-800 border-gray-700'
                                            )}
                                        >
                                            {departments.map((dept) => (
                                                <SelectItem
                                                    key={dept}
                                                    value={dept}
                                                    className={cn(
                                                        isDarkMode &&
                                                            'text-gray-200 focus:bg-gray-700 focus:text-white'
                                                    )}
                                                >
                                                    {dept}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Status
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className={cn(
                                                    isDarkMode &&
                                                        'text-white border-gray-700'
                                                )}
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent
                                            className={cn(
                                                isDarkMode &&
                                                    'bg-gray-800 border-gray-700'
                                            )}
                                        >
                                            <SelectItem
                                                value="Active"
                                                className={cn(
                                                    isDarkMode &&
                                                        'text-gray-200 focus:bg-gray-700 focus:text-white'
                                                )}
                                            >
                                                Active
                                            </SelectItem>
                                            <SelectItem
                                                value="Inactive"
                                                className={cn(
                                                    isDarkMode &&
                                                        'text-gray-200 focus:bg-gray-700 focus:text-white'
                                                )}
                                            >
                                                Inactive
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter address"
                                            className={cn(
                                                isDarkMode &&
                                                    'text-white placeholder:text-gray-400'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            isDarkMode ? 'text-gray-200' : ''
                                        }
                                    >
                                        Image URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            required={false}
                                            placeholder="Enter image URL"
                                            className={cn(
                                                isDarkMode &&
                                                    'text-white placeholder:text-gray-400'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className={cn(
                                    isDarkMode &&
                                        'border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white'
                                )}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={cn(
                                    'bg-blue-600 text-white hover:bg-blue-700',
                                    isDarkMode &&
                                        'bg-blue-600 text-white hover:bg-blue-700'
                                )}
                            >
                                {employee ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
