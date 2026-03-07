type GastosCategoriaProps = {
  categoria: string;
  valor: number;
  percentual: string;
};

export default function GastosCategoria({
  categoria,
  valor,
  percentual,
}: GastosCategoriaProps) {
  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center justify-between">
        <p>{categoria}</p>
        <div className="flex items-center gap-1">
          <p className="font-bold">R$ {valor.toFixed(2)}</p>
          <p className="text-xs text-gray-500">({percentual}%)</p>
        </div>
      </div>
      <div className="w-full bg-zinc-950 h-2 rounded-full mt-1 shadow">
        <div
          className="bg-purple h-2 rounded-full"
          style={{ width: `${percentual}%` }}
        ></div>
      </div>
    </div>
  );
}
