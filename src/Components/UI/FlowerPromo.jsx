import React from "react";

export default function FlowerBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-6 py-8 bg-base-100">
      {/* Coluna 1: Imagem principal com mulher */}
      <div className="relative lg:col-span-2 rounded-xl overflow-hidden shadow">
        <img
          src="https://www.floresonline.com.br/media/home/Banner_Principal_Juana_Martinez.webp"
          alt="Presente com flores"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 text-right text-gray-800 max-w-md px-4 sm:top-8 sm:right-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Presentes Únicos
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base">
            Presentes para quem você ama entregues <br />
            hoje em todo o Brasil
          </p>
        </div>
      </div>

      {/* Coluna 2: Imagem menor + botão marketplace */}
      <div className="flex flex-col gap-4 h-full">
        {/* Imagem menor */}
        <div className="relative rounded-xl overflow-hidden shadow flex-1">
          <img
            src="https://www.floresonline.com.br/media/home/Banner_Secundario.webp"
            alt="Flores com entrega em 3h"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 text-right text-gray-800 max-w-xs px-4 sm:top-8 sm:right-6">
            <p className="text-sm sm:text-base md:text-lg font-semibold leading-snug">
              Flores e presentes <br />online com <br />entrega em 3h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
