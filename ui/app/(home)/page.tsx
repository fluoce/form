import { Hero } from "@/components/home/hero"
import { View } from "@/components/home/view"

export default function Home() {
  return (
    <div className="mt-8 flex flex-col gap-16 sm:mt-16 sm:gap-24 md:mt-24 md:gap-32">
      <Hero />
      <View />
    </div>
  )
}
