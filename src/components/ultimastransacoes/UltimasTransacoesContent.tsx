import { categoriaModalidade } from "../modal/ModalData";
import UltimaTransacao from "./UltimaTransacao";
import { transacoes } from "./UltimaTransacaoData";

export default function UltimasTransacoesContent() {
  return (
    <div className="bg-container-card p-8 rounded-xl border border-gray-800 shadow mt-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-black text-xl">Ultimas Transações</h1>
        <button className="text-gray-400 px-2 py-1 text-sm rounded-md border border-gray-800 hover:text-purple hover:border-purple transition-colors cursor-pointer">
          Ver todas
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {transacoes.map((item, key) => (
          <UltimaTransacao
            key={key}
            titulo={item.titulo}
            modalidade={item.modalidade}
            data={item.data}
            valor={item.valor}
          />
        ))}
      </div>
    </div>
  );
}
