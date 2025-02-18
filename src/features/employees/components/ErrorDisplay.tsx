import { Button } from '@/components/ui/button'

interface ErrorDisplayProps {
    error: string
    isDarkMode: boolean
    onRetry: () => void
}

export const ErrorDisplay = ({
    error,
    isDarkMode,
    onRetry
}: ErrorDisplayProps) => (
    <div className="text-center py-12">
        <p className={`text-red-600 ${isDarkMode ? 'text-red-400' : ''}`}>
            {error}
        </p>
        <Button onClick={onRetry} className="mt-4" variant="default">
            Retry
        </Button>
    </div>
)
