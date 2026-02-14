"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef } from "react";

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
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: images.length > 3,
    mode: "snap",
    renderMode: "performance",

    slides: {
      perView: 3,
      spacing: 20,
      origin: "center",
    },

    defaultAnimation: {
      duration: 1000,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    },

    slideChanged(s) {
      setActiveIndex(s.track.details.rel);
    },
  });

  // ✅ Auto Slide
  useEffect(() => {
    const instance = slider?.current;
    if (!instance) return;

    const interval = setInterval(() => {
      instance.next();
    }, 4500);

    return () => clearInterval(interval);
  }, [slider]);

  const dotsRefs = useRef<HTMLButtonElement[]>([]);

  return (
    <div className="w-full">
      <div ref={sliderRef} className="keen-slider py-6">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => slider.current?.moveToIdx(i)}
            className={`keen-slider__slide flex justify-center transition-all duration-500 cursor-pointer`}
          >
            <div
              className={`
                relative rounded-2xl overflow-hidden
                transition-all duration-500
                ${
                  activeIndex === i
                    ? "scale-110 opacity-100 z-20"
                    : "scale-90 opacity-40"
                }
                h-[160px] w-full
              `}
            >
              <img src={img} alt="" className="object-cover w-full h-full" />

              {/* subtle glow for active */}
              {activeIndex === i && (
                <div className="absolute inset-0 ring-2 ring-white rounded-2xl pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="relative flex justify-center gap-2 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => slider.current?.moveToIdx(idx)}
            className="w-2.5 h-2.5 rounded-full bg-white/20 transition-colors"
            ref={(el) => {
              if (el) dotsRefs.current[idx] = el;
            }}
          />
        ))}

        {dotsRefs.current[activeIndex] && (
          <div
            className="absolute top-0 w-2.5 h-2.5 rounded-full bg-white transition-all duration-300"
            style={{
              left: dotsRefs.current[activeIndex].offsetLeft,
            }}
          />
        )}
      </div>
    </div>
  );
}
