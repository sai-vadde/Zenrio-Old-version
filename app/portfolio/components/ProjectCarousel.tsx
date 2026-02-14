"use client";

import { useEffect, useRef, useCallback } from "react";

type Props = {
  images: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export default function ProjectCarousel({
  images,
  activeIndex,
  setActiveIndex,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const duplicated = [...images, ...images, ...images];

  const currentIndex = useRef(total); // start from middle set
  const slideWidth = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Measure responsive width
  const measure = () => {
    if (!trackRef.current) return;

    const slide = trackRef.current.querySelector("[data-slide]") as HTMLElement;

    if (!slide) return;

    const style = window.getComputedStyle(trackRef.current);
    const gap = parseInt(style.columnGap || "20");

    slideWidth.current = slide.offsetWidth + gap;
  };

  const updatePosition = (animate = true) => {
    if (!trackRef.current || !containerRef.current) return;

    const offset =
      containerRef.current.offsetWidth / 2 - slideWidth.current / 2;

    const x = -currentIndex.current * slideWidth.current + offset;

    trackRef.current.style.transition = animate
      ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    trackRef.current.style.transform = `translate3d(${x}px,0,0)`;
  };

  // Infinite correction
  const handleInfinite = () => {
    if (currentIndex.current >= total * 2) {
      currentIndex.current = total;
      updatePosition(false);
    }

    if (currentIndex.current < total) {
      currentIndex.current = total * 2 - 1;
      updatePosition(false);
    }
  };

  // Go to specific slide
  const goTo = useCallback(
    (index: number) => {
      currentIndex.current = index + total;
      setActiveIndex(index);
      updatePosition(true);
    },
    [setActiveIndex, total],
  );

  // Next slide (autoplay)
  const next = useCallback(() => {
    currentIndex.current += 1;

    const realIndex =
      (((currentIndex.current - total) % total) + total) % total;

    setActiveIndex(realIndex);
    updatePosition(true);
  }, [setActiveIndex, total]);

  // Autoplay (faster)
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      next();
    }, 2500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  // Initial setup
  useEffect(() => {
    measure();
    updatePosition(false);
  }, []);

  // Resize recalculation
  useEffect(() => {
    const handleResize = () => {
      measure();
      updatePosition(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // After transition check infinite
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = () => {
      handleInfinite();
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, []);

  // Drag
  const startX = useRef(0);
  const isDragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    trackRef.current!.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const delta = e.clientX - startX.current;

    const offset =
      containerRef.current!.offsetWidth / 2 - slideWidth.current / 2;

    const x = -currentIndex.current * slideWidth.current + offset + delta;

    trackRef.current!.style.transform = `translate3d(${x}px,0,0)`;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const delta = e.clientX - startX.current;
    isDragging.current = false;

    if (delta < -50) currentIndex.current += 1;
    if (delta > 50) currentIndex.current -= 1;

    const realIndex =
      (((currentIndex.current - total) % total) + total) % total;

    setActiveIndex(realIndex);
    updatePosition(true);
  };

  return (
    <div className="w-full select-none">
      <div ref={containerRef} className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex gap-5"
          style={{ willChange: "transform" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {duplicated.map((img, i) => {
            const realIndex = i % total;
            const isActive = realIndex === activeIndex;

            return (
              <div
                key={i}
                data-slide
                onClick={() => goTo(realIndex)}
                className="
    flex-shrink-0
    w-[85%] sm:w-[65%] md:w-[45%] lg:w-[320px]
    transition-all duration-500
    cursor-pointer
  "
              >
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                    isActive
                      ? "scale-110 opacity-100 z-20"
                      : "scale-90 opacity-40"
                  }`}
                >
                  {/* Responsive 16:9 container */}
                  <div className="w-full aspect-video">
                    <img
                      src={img}
                      className="w-full h-full object-contain md:object-cover"
                      alt={`Project image ${i + 1}`}
                    />
                  </div>

                  {isActive && (
                    <div className="absolute inset-0 ring-2 ring-white rounded-2xl pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "bg-white w-6" : "bg-white/30 w-2.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
