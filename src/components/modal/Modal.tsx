"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Modal({ isOpen, onClose, handleSubmit }: ModalProps) {
  const [modalidade, setModalidade] = useState<"receita" | "despesa">(
    "receita",
  );

  const [categoria, setCategoria] = useState<string>("vazio");

  const categoriaModalidade = {
    receita: [
      "Salário",
      "Freelance",
      "Investimentos",
      "Doação",
      "Pix",
      "Outros",
    ],
    despesa: [
      "Lanches e Refeições",
      "Transporte",
      "Moradia",
      "Lazer",
      "Saúde",
      "Educação",
      "Jogos",
      "Mercado",
      "Assinaturas",
      "Pessoal",
      "Outros",
    ],
  };

  useEffect(() => {
    setCategoria("vazio");
  }, [modalidade]);

  return (
    <div
      className={`flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`relative bg-card border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transition-transform duration-200 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between p-1">
            <h1 className="font-semibold">Nova Transação</h1>
            <X
              className="p-1 h-8 w-8 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
              onClick={onClose}
            />
          </div>
          <div className="flex items-center bg-gray-800 rounded-lg p-1 gap-1">
            <button
              className={`w-full font-semibold py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${modalidade === "receita" ? "bg-success/80" : "bg-gray-800 hover:bg-gray-700"}`}
              onClick={() => setModalidade("receita")}
            >
              + Receita
            </button>
            <button
              className={`w-full font-semibold py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${modalidade === "despesa" ? "bg-danger/80" : "bg-gray-800 hover:bg-gray-700"}`}
              onClick={() => setModalidade("despesa")}
            >
              - Despesa
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                id="descricao"
                className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                placeholder="Digite uma descrição..."
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="categoria">Categoria</label>
              <select
                className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="vazio" disabled className="bg-gray-800">
                  Selecione uma opção
                </option>
                {categoriaModalidade[modalidade].map((categoria) => (
                  <option
                    key={categoria}
                    value={categoria}
                    className="bg-gray-800"
                  >
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div>
                <label htmlFor="valor">Valor</label>
                <input
                  type="text"
                  name="valor"
                  id="valor"
                  placeholder="R$: "
                  className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                />
              </div>

              <div>
                <label htmlFor="data">Data</label>
                <input
                  type="date"
                  name="data"
                  id="data"
                  className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full text-white font-semibold py-2 rounded-lg transition-colors duration-200 mt-2 ${modalidade === "receita" ? "bg-success/80 hover:bg-success" : "bg-danger/80 hover:bg-danger"}`}
            >
              + Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
