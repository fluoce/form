"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UseUrlToggleProps {
  queryKey: string;
  openValue?: string;
}

export function useUrlToggle({
  queryKey,
  openValue = "true",
}: UseUrlToggleProps) {
  const router = useRouter();
  const params = useSearchParams();
  const open = params.get(queryKey) === openValue;

  const handleOpen = useCallback(() => {
    const search = new URLSearchParams(params.toString());
    if (search.get(queryKey) !== openValue) {
      search.set(queryKey, openValue);
      router.replace(`?${search.toString()}`, { scroll: false });
    }
  }, [params, router, queryKey, openValue]);

  const handleClose = useCallback(() => {
    const search = new URLSearchParams(params.toString());
    if (search.has(queryKey)) {
      search.delete(queryKey);
      router.replace(`?${search.toString()}`, { scroll: false });
    }
  }, [params, router, queryKey]);

  return { open, handleOpen, handleClose };
}
