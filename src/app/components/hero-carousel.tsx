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
        disableOnInteraction: false,
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
          <div className="relative w-[45%] h-[600px]">
            <Image
              src="/images/prato1.jpg"
              alt="Ribeye"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="w-[55%] flex flex-col justify-center">
            <h1 className="text-7xl font-bold mb-6">
              <span className="text-orange-500">Rib</span>Eye
            </h1>
            <h3 className="text-3xl text-gray-300 leading-12 mb-8">
              Descubra a suculência incomparável do Ribeye, um dos cortes mais
              apreciados pelos amantes de carne. Extraído da parte nobre do
              contrafilé, possui intenso marmoreio que garante maciez excepcional e
              sabor marcante a cada mordida.
            </h3>
            <h2 className="text-4xl font-bold text-orange-500 mb-6">
              R$ 85,99
            </h2>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-2xl px-8 py-4 rounded-lg w-fit font-bold cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex h-full items-center px-10 gap-10">
          <div className="relative w-[45%] h-[600px]">
            <Image
              src="/images/prato2.jpg"
              alt="Costela"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="w-[55%] flex flex-col justify-center">
            <h1 className="text-7xl font-bold mb-6">
              <span className="text-orange-500">Costela</span> Angus
            </h1>
            <h3 className="text-3xl text-gray-300 leading-12 mb-8">
              Nossa Costela Especial é preparada lentamente para alcançar o equilíbrio perfeito entre maciez e sabor. Com fibras que se desfazem facilmente e uma camada de gordura que realça cada pedaço, este clássico da culinária conquista pelo aroma defumado e pela suculência incomparável. Uma escolha perfeita para compartilhar momentos especiais.
            </h3>
            <h2 className="text-4xl font-bold text-orange-500 mb-6">
              R$ 85,99
            </h2>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-2xl px-8 py-4 rounded-lg w-fit font-bold cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex h-full items-center px-10 gap-10">
          <div className="relative w-[45%] h-[600px]">
            <Image
              src="/images/prato3.jpg"
              alt="Tbone"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="w-[55%] flex flex-col justify-center">
            <h1 className="text-7xl font-bold mb-6">
              <span className="text-orange-500">T</span>Bone
            </h1>
            <h3 className="text-3xl text-gray-300 leading-12 mb-8">
              O T-Bone é o corte perfeito para quem deseja o melhor de dois mundos. Separados pelo característico osso em formato de &quot;T&quot;, estão o macio filé-mignon e o saboroso contrafilé, proporcionando uma combinação única de textura e sabor. Grelhado na brasa para preservar sua suculência natural, é uma verdadeira experiência para os apreciadores de cortes nobres.
            </h3>
            <h2 className="text-4xl font-bold text-orange-500 mb-6">
              R$ 85,99
            </h2>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-2xl px-8 py-4 rounded-lg w-fit font-bold cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}