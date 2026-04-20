"use client";

import { Button } from "@/components/ui/button";
import { workspaceRoutes } from "@/const/route-const";
import { Square } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-2 p-4">
      <Link href={workspaceRoutes.create}>
        <Button>
          <Square /> Form Fluoce
        </Button>
      </Link>
    </div>
  );
}
