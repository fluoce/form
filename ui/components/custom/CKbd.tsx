"use client";

import type { ReactNode } from "react";
import { Kbd } from "../ui/kbd";
import { useEffect, useState } from "react";

export function CKbd({ children }: { children: ReactNode }) {
    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine)");
        setCanShow(mq.matches);
        const handler = () => setCanShow(mq.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    if (!canShow) return null;
    return <Kbd>{children}</Kbd>;
}