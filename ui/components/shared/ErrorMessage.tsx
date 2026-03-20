const ErrorMessage = ({ error }: { error: string }) => {
  return error ? (
    <span className="text-xs font-medium break-all text-red-500">{error}</span>
  ) : null;
};

export default ErrorMessage;
