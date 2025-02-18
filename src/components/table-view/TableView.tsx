import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Employee } from '@/lib/schemas'
import { useEmployeeStore } from '@/lib/store'
import { defaultAvatar } from '@/lib/constant'
import Image from 'next/image'

interface TableViewProps {
    employees: Employee[]
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
}

export default function TableView({
    employees,
    onEdit,
    onDelete
}: TableViewProps) {
    const isDarkMode = useEmployeeStore((state) => state.isDarkMode)

    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div
                        className={`overflow-hidden shadow ring-1 ${
                            isDarkMode
                                ? 'ring-gray-700'
                                : 'ring-black ring-opacity-5'
                        } md:rounded-lg`}
                    >
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead
                                className={
                                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                                }
                            >
                                <tr>
                                    <th
                                        scope="col"
                                        className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                        } sm:pl-6`}
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className={`px-3 py-3.5 text-left text-sm font-semibold ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className={`px-3 py-3.5 text-left text-sm font-semibold ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className={`px-3 py-3.5 text-left text-sm font-semibold ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        Department
                                    </th>
                                    <th
                                        scope="col"
                                        className={`px-3 py-3.5 text-left text-sm font-semibold ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                    >
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className={`divide-y ${
                                    isDarkMode
                                        ? 'divide-gray-700 bg-gray-900'
                                        : 'divide-gray-200 bg-white'
                                }`}
                            >
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td
                                            className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : ''
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <Image
                                                        className="h-10 w-10 rounded-full"
                                                        src={
                                                            employee.imageUrl ||
                                                            defaultAvatar
                                                        }
                                                        alt=""
                                                        height={40}
                                                        width={40}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div
                                                        className={`font-medium ${
                                                            isDarkMode
                                                                ? 'text-white'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {employee.name}
                                                    </div>
                                                    <div
                                                        className={
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-500'
                                                        }
                                                    >
                                                        {employee.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={`whitespace-nowrap px-3 py-4 text-sm ${
                                                isDarkMode
                                                    ? 'text-gray-300'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {employee.email}
                                        </td>
                                        <td
                                            className={`whitespace-nowrap px-3 py-4 text-sm ${
                                                isDarkMode
                                                    ? 'text-gray-300'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {employee.phone}
                                        </td>
                                        <td
                                            className={`whitespace-nowrap px-3 py-4 text-sm ${
                                                isDarkMode
                                                    ? 'text-gray-300'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {employee.department}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                    employee.status === 'Active'
                                                        ? isDarkMode
                                                            ? 'bg-green-900 text-green-200'
                                                            : 'bg-green-100 text-green-800'
                                                        : isDarkMode
                                                        ? 'bg-red-900 text-red-200'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {employee.status}
                                            </span>
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button
                                                onClick={() => onEdit(employee)}
                                                className={`${
                                                    isDarkMode
                                                        ? 'text-blue-400 hover:text-blue-300'
                                                        : 'text-blue-600 hover:text-blue-900'
                                                } mr-4`}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDelete(employee.id!)
                                                }
                                                className={
                                                    isDarkMode
                                                        ? 'text-red-400 hover:text-red-300'
                                                        : 'text-red-600 hover:text-red-900'
                                                }
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
