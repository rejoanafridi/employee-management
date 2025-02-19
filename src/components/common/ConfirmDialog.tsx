import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    onConfirm: () => void
    onCancel: () => void
    confirmDisabled?: boolean
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmLabel,
    onConfirm,
    onCancel,
    confirmDisabled
}: ConfirmDialogProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                    {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {message}
                </p>
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={confirmDisabled}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={confirmDisabled}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
