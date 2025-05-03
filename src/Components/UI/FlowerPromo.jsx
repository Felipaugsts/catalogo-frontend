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
        <div className="absolute top-8 right-8 text-right text-gray-800 max-w-md">
            <h2 className="text-4xl font-bold">Presentes Únicos</h2>
            <p className="mt-2 text-lg">
            Presentes para quem você ama entregues <br />
            hoje em todo o Brasil
            </p>
            <button className="btn btn-neutral mt-4">Confira</button>
        </div>
        </div>


      {/* Coluna 2: Imagem menor + botão marketplace */}
      <div className="flex flex-col gap-4">
        {/* Imagem menor */}
        <div className="relative rounded-xl overflow-hidden shadow flex-1">
            <img
                src="https://www.floresonline.com.br/media/home/Banner_Secundario.webp"
                alt="Flores com entrega em 3h"
                className="w-full h-full object-cover"
            />
            <div className="absolute top-8 right-6 text-right text-gray-800 max-w-xs">
                <p className="text-xl font-semibold leading-snug">
                Flores e presentes <br />online com <br />entrega em 3h
                </p>
                <button className="btn btn-neutral mt-4">Confira</button>
            </div>
            </div>
      </div>
    </div>
  );
}
