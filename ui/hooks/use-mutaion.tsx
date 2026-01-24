import { useState, useTransition } from "react";

export function useMutation<TArgs extends any[], TResult>(
    mutationFn: (...args: TArgs) => Promise<TResult>,
    options?: {
        validate?: (...args: TArgs) => string | null;
    }
) {
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutateAsync = async (...args: TArgs): Promise<TResult> => {
        if (!args || args.length === 0) {
            const err = "Something is missing !";
            setIsError(true);
            setError(err);
            return Promise.reject(err);
        }
        if (options?.validate) {
            const validationError = options.validate(...args);
            if (validationError) {
                setIsError(true);
                setError(validationError);
                return Promise.reject(validationError);
            }
        }
        setIsLoading(true);
        setIsError(false);
        setError(null);
        return await new Promise<TResult>((resolve, reject) => {
            startTransition(() => {
                mutationFn(...args)
                    .then((data: any) => {
                        setIsLoading(false);
                        if (data && data.success === false || data.error || data.statusCode >= 400) {
                            setIsError(true);
                            const errMsg =
                                Array.isArray(data.message) ? data.message[0] : data.message;
                            if (!errMsg) {
                                setError("Something went wrong")
                                reject("Something went wrong")
                            }
                            setError(errMsg);
                            reject(errMsg);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setIsError(true);
                        setError(typeof err === "string" ? err : "Something went wrong");
                        reject(err);
                    });
            });
        });
    };

    return {
        mutateAsync,
        isPending: isLoading || isPending,
        isError,
        error,
    };
}
