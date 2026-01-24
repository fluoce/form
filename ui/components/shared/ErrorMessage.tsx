
const ErrorMessage = ({ error }: { error: string }) => {
    return (
        error ? <span className="text-xs text-red-500 font-medium break-all">{error}</span> : null
    )
}

export default ErrorMessage