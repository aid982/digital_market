'use client'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { url } from "inspector";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  urls: string[];
};

const ImageSlider = (props: Props) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [slideConfig, setSlideConfig] = useState({
    isBegining: true,
    isEnd: activeIndex === (props.urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBegining: activeIndex === 0,
        isEnd: activeIndex === (props.urls.length ?? 0) - 1,
      });
    });
  }, [swiper, props.urls]);

  const activeStyle =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 rounded-full bg-white  border-2 border-zinc-200 place-items-center";
  const inactiveStyle = "hidden text-gray-400";

  return (
    <div className="group relative bg-zinc-100 overflow-hidden rounded-xl aspect-square">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyle, "right-3 transition", {
            [inactiveStyle]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700"> </ChevronRight>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyle, "left-3 transition", {
            [inactiveStyle]: slideConfig.isBegining,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBegining,
          })}
          aria-label="next image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700"> </ChevronLeft>
        </button>
      </div>
      <Swiper 
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        pagination={{
          renderBullet:(_,className)=>{
            return `<span class="rounded-full transition ${className}"></span>`

          }
        }}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full "
      >
        {props.urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 h-full w-full ">
            <Image
              src={url}
              sizes={"2xl"}
              fill
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
              alt="product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
