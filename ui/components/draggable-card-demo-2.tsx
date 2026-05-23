"use client"

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card"
import { routes } from "@/const/routes"
import Link from "next/link"

export default function DraggableCardDemo() {
  const items = [
    {
      title: "Knowledge Test",
      image: "fdy.png",
      className: "absolute top-10 left-[45%] rotate-[10deg]",
    },
    {
      title: "Fluoce's First Form",
      image: "fw.png",
      className: "absolute top-4 left-[24%] rotate-[-5deg]",
    },
    {
      title: "Preferences Survey",
      image: "fwr.png",
      className: "absolute top-20 left-[6%] rotate-[2deg]",
    },
  ]
  return (
    <DraggableCardContainer className="relative flex h-full w-full items-center justify-center overflow-clip">
      <Link
        href={routes.dashboard.base}
        className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 cursor-pointer text-center text-2xl font-semibold text-neutral-400 md:text-4xl dark:text-neutral-800"
      >
        Launch your first form, free to start.
      </Link>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-90 w-80 object-cover"
          />
          <h3 className="mt-2 text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}
