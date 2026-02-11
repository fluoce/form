import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback, useEffect } from "react"

interface UseUrlToggleProps {
    queryKey: string
    openValue?: string
}

export function useUrlToggle({ queryKey, openValue = "true" }: UseUrlToggleProps) {
    const router = useRouter();
    const params = useSearchParams();
    const openFromUrl = params.get(queryKey) === openValue;
    const [open, setOpen] = useState(openFromUrl);

    useEffect(() => {
        if (open !== openFromUrl) {
            setOpen(openFromUrl);
        }
    }, [openFromUrl]);

    const handleOpen = useCallback(() => {
        const search = new URLSearchParams(Array.from(params.entries()));
        if (search.get(queryKey) !== openValue) {
            search.set(queryKey, openValue);
            router.replace(`?${search.toString()}`, { scroll: false });
        }
        setOpen(true);
    }, [params, router, queryKey, openValue]);

    const handleClose = useCallback(() => {
        const search = new URLSearchParams(Array.from(params.entries()));
        if (search.get(queryKey)) {
            search.delete(queryKey);
            router.replace(`?${search.toString()}`, { scroll: false });
        }
        setOpen(false);
    }, [params, router, queryKey]);

    return { open, handleOpen, handleClose }
}