import { categoriaModalidade } from "../modal/ModalData";

type UltimaTransacaoProps = {
  titulo: string;
  modalidade: {
    tipo: string;
    icone: string;
    texto: string;
  };
  data: Date;
  valor: number;
};

export default function UltimaTransacao({
  titulo,
  modalidade,
  data,
  valor,
}: UltimaTransacaoProps) {
  const tipo = typeof modalidade;
  return (
    <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/80 transition-all hover:translate-x-1 duration-200">
      <div className="flex items-center gap-4">
        <p
          className={`p-2 rounded-lg ${modalidade.tipo === "receita" ? "bg-success/40" : "bg-danger/40"}`}
        >
          {modalidade.icone}
        </p>
        <div className="flex flex-col gap-0">
          <p className="font-black text-md">{titulo}</p>
          <small className="text-xs text-gray-400">
            {modalidade.texto} -{" "}
            {data.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </small>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <p
          className={`text-lg font-black ${modalidade.tipo === "receita" ? "text-success" : "text-danger"}`}
        >
          {modalidade.tipo === "receita" ? "+" : "-"}
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <div className="flex items-center gap-4">
          <button className="px-1.5 py-0.5 rounded-lg hover:bg-gray-700 cursor-pointer">
            ✏️
          </button>
          <button className="px-1.5 py-0.5 rounded-lg hover:bg-gray-700 cursor-pointer">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
