export default function SkeletonCard() {
    return (
      <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col justify-between animate-pulse">
        {/* Imagem do produto (skeleton) */}
        <div className="skeleton h-48 w-full rounded-lg mb-4" />
  
        {/* Nome do produto */}
        <div className="skeleton h-5 w-3/4 mb-2" />
  
        {/* Descrição */}
        <div className="skeleton h-4 w-full mb-2" />
        <div className="skeleton h-4 w-5/6 mb-4" />
  
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton w-4 h-4 rounded" />
          ))}
        </div>
  
        {/* Preço */}
        <div className="skeleton h-4 w-1/3 mb-4" />
  
        {/* Botão */}
        <div className="skeleton h-10 w-full rounded" />
      </div>
    );
  }
  