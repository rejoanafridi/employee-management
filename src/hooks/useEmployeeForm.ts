import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Employee, employeeSchema } from '@/lib/schemas'

export const useEmployeeForm = (employee?: Employee) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<Employee>({
        resolver: zodResolver(employeeSchema),
        defaultValues: employee || {
            name: '',
            email: '',
            phone: '',
            address: '',
            department: 'Engineering',
            status: 'Active'
        }
    })

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        reset
    }
}
