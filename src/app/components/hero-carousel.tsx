"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      loop={true}
      style={{

        '--swiper-pagination-color': "#FF9800",
        '--swiper-pagination-bullet-size': "12px",
        '--swiper-pagination-bullet-inactive-color': "#FFF",

      } as React.CSSProperties
      }
      className="h-[800px]"
    >
      <SwiperSlide>
        <div className="flex h-full items-center px-10 gap-10">
          <div className="relative w-[45%] h-120 lg:h-[600px]">
            <Image
              src="/images/prato1.jpg"
              alt="Ribeye"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="w-[55%] flex flex-col justify-center">
            <h1 className="text-5xl lg:text-4xl font-bold mb-1 lg:mb-6">
              <span className="text-orange-500">Rib</span>Eye
            </h1>
            <h3 className=" text{30px} md:text-2xl lg:text-3xl text-gray-300 leading-8 lg:leading-12 mb-3 lg:mb-8">
              Descubra a suculência incomparável do Ribeye, um dos cortes mais
              apreciados pelos amantes de carne. Extraído da parte nobre do
              contrafilé, possui intenso marmoreio que garante maciez excepcional e
              sabor marcante a cada mordida.
            </h3>
            <h2 className="text-2xl lg:text-4xl font-bold text-orange-500 mb-6">
              R$ 85,99
            </h2>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-2xl px-3 py-1.5 lg:px-8 lg:py-4 rounded-lg w-fit font-bold cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex h-full items-center px-10 gap-10">
          <div className="relative w-[45%] h-120 lg:h-[600px]">
            <Image
              src="/images/prato2.jpg"
              alt="Costela"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="w-[55%] flex flex-col justify-center">
            <h1 className="text-5xl lg:text-4xl font-bold mb-1 lg:mb-6">
              <span className="text-orange-500">Costela</span> Angus
            </h1>
            <h3 className=" text{30px} md:text-2xl lg:text-3xl text-gray-300 leading-8 lg:leading-12 mb-3 lg:mb-8">
              Nossa Costela Especial é preparada lentamente para atingir o máximo de maciez e sabor. Com carne suculenta, fibras que se desfazem facilmente e um leve toque defumado, é a escolha perfeita para compartilhar momentos especiais.
            </h3>
            <h2 className="text-2xl lg:text-4xl font-bold text-orange-500 mb-6">
              R$ 85,99
            </h2>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-2xl px-3 py-1.5 lg:px-8 lg:py-4 rounded-lg w-fit font-bold cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex h-full items-center px-10 gap-10">
          <div className="relative w-[45%] h-120 lg:h-[600px]">
            <Image
              src="/images/prato3.jpg"
              alt="Tbone"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="w-[55%] flex flex-col justify-center">
            <h1 className="text-5xl lg:text-4xl font-bold mb-1 lg:mb-6">
              <span className="text-orange-500">T</span>Bone
            </h1>
            <h3 className=" text{30px} md:text-2xl lg:text-3xl text-gray-300 leading-8 lg:leading-12 mb-3 lg:mb-8">
              O T-Bone reúne o melhor de dois cortes nobres: o macio filé-mignon e o saboroso contrafilé. Grelhado na brasa para preservar sua suculência, oferece uma combinação única de textura e sabor para os amantes de carne.
            </h3>
            <h2 className="text-2xl lg:text-4xl font-bold text-orange-500 mb-6">
              R$ 85,99
            </h2>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-2xl px-3 py-1.5 lg:px-8 lg:py-4 rounded-lg w-fit font-bold cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}