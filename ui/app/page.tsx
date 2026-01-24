import { Button } from "@/components/ui/button";
import { CodeXml, SquareMousePointer } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-2 p-4">
      <Link href="/dev">
        <Button>
          <CodeXml /> Developers
        </Button>
      </Link>
      <Link href="/admin">
        <Button className="">
          <SquareMousePointer />
          Hosted Forms
        </Button>
      </Link>
    </div>
  );
}