import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input' // Import from shadcn/ui

interface SearchInputProps {
    onSearch: (searchTerm: string) => void
    placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
    onSearch,
    placeholder = 'Search...'
}) => {
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const delay = setTimeout(() => {
            onSearch(searchTerm)
        }, 500)

        return () => clearTimeout(delay)
    }, [searchTerm, onSearch])

    return (
        <div className="w-full max-w-md mx-auto">
            <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400 transition-all"
            />
        </div>
    )
}

export default SearchInput
