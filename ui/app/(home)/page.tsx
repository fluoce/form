import { Footer } from "@/components/home/footer"
import { Hero } from "@/components/home/hero"
import { View } from "@/components/home/view"

export default function Home() {
  return (
    <div className="mt-16 flex flex-col gap-16 sm:mt-24 sm:gap-24 md:mt-32 md:gap-32">
      <Hero />
      <View />
      <Footer />
    </div>
  )
}
