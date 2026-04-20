import { Button } from "@/components/ui/button"
import { routes } from "@/const/routes"
import { Square } from "lucide-react"
import Link from "next/link"

const page = () => {

  
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Link href={routes.dashboard.base}>
        <Button>
          <Square /> Form Fluoce
        </Button>
      </Link>
    </div>
  )
}

export default page
