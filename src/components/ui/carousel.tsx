"use client";

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>[0]

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: UseCarouselParameters
  plugins?: any[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, orientation = "horizontal", opts, setApi, plugins, ...props }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    }, plugins)

    React.useEffect(() => {
      if (emblaApi && setApi) {
        setApi(emblaApi)
      }
    }, [emblaApi, setApi])

    return (
      <div ref={ref} className={cn("relative", className)} >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {props.children}
          </div>
        </div>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex", className)} {...props} />
  )
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 flex-shrink-0 flex-grow-0 basis-full", className)} {...props} />
  )
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute left-4 top-1/2 -translate-y-1/2 rounded-full", className)}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute right-4 top-1/2 -translate-y-1/2 rounded-full", className)}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
)
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}