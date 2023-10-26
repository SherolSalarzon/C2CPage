import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css";

SwiperCore.use([Autoplay]);
export default function MySwiper({ images }) {
  return (
    <Swiper
      className="swiper-container"
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        reverseDirection: false,
      }}
      speed={1000}
      loop={true}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img.default.src}
            alt="Slide"
            className="flex mb-3 h-full rounded ml-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
