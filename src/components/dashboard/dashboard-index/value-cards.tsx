"use client";

import { Eye } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";
import { ValueCard } from "./value-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ValueCards() {
  const { data: portfolio, isLoading } = usePortfolio();
  const { isMobile } = useMediaQuery();
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      if (!containerRef.current) return;
      const scrollPosition = containerRef.current.scrollLeft;
      const cardWidth = containerRef.current.offsetWidth;
      const newActiveSlide = Math.round(scrollPosition / cardWidth);
      setActiveSlide(newActiveSlide);
    }, 100);
  };

  const goToSlide = (index: number) => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveSlide(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const cardWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: activeSlide * cardWidth,
        behavior: 'auto'
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSlide]);

  const cards = [
    {
      title: "My Savings",
      value: 0,
      subtitle: isLoading ? "Loading..." : `$${0.03} earned`,
      actions: {
        primary: { label: "Add Money", onClick: () => {} },
        secondary: { label: "Transfer", onClick: () => {} }
      }
    },
    {
      title: "My Portfolio",
      value: isLoading ? 0 : (portfolio?.totalValue || 0),
      subtitle: isLoading ? "Loading..." : `↑ ${portfolio?.growth?.percentage}%`,
      actions: {
        primary: { label: "Invest", onClick: () => {} },
        secondary: { label: "Withdraw", onClick: () => {} }
      }
    },
    {
      title: "My Wallet",
      value: isLoading ? 0 : (portfolio?.totalValue || 0),
      subtitle: isLoading ? "Loading..." : `↑ ${portfolio?.growth?.percentage}%`,
      actions: {
        primary: { label: "Wallet Balance", onClick: () => {} },
        secondary: { label: "Withdraw", onClick: () => {} }
      }
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div 
        ref={containerRef}
        className={cn(
          "grid gap-4",
          isMobile 
            ? "overflow-x-auto snap-x snap-mandatory flex overflow-y-hidden scrollbar-hide" 
            : "md:grid-cols-2"
        )}
        onScroll={handleScroll}
      >
        {cards.map((card, index) => (
          <div 
            key={card.title}
            className={cn(
              isMobile && "min-w-full snap-start"
            )}
          >
            <ValueCard
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={<Eye className="h-4 w-4" />}
              actions={card.actions}
            />
          </div>
        ))}
      </div>
      
      {/* Dots indicator for mobile */}
      {isMobile && (
        <div className="flex justify-center gap-2 mt-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                activeSlide === index ? "w-6 bg-purple-500" : "w-1.5 bg-purple-200"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}