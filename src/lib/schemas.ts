import { z } from 'zod'

export const employeeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .regex(/^[0-9+\-\s()]*$/, 'Invalid phone number format'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    department: z
        .enum(['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'])
        .optional(),
    status: z.enum(['Active', 'Inactive']).default('Active'),
    imageUrl: z.string().url().optional()
})

export type Employee = z.infer<typeof employeeSchema>
