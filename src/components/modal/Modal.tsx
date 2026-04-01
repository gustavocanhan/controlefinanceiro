"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { categoriaModalidade } from "./ModalData";
import api from "@/lib/api";
import useAuthStore from "@/store/authStore";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "Receita" | "Despesa";
  category: string;
  date: string;
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
};

export default function Modal({ isOpen, onClose, transaction }: ModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Receita" | "Despesa">("Receita");
  const [category, setCategory] = useState("vazio");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { triggerRefresh } = useAuthStore();

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setType(transaction.type);
      setCategory(transaction.category);
      setDate(transaction.date.split("T")[0]);
    } else {
      setDescription("");
      setAmount("");
      setType("Receita");
      setCategory("vazio");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [transaction, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amountNumber = Number(amount.replace(/\./g, "").replace(",", "."));

    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError("Digite um valor válido");
      return;
    }

    if (category === "vazio" || category === "") {
      setError("Selecione uma categoria");
      return;
    }

    setLoading(true);

    try {
      if (transaction) {
        await api.put(`/transactions/${transaction._id}`, {
          description,
          amount: amountNumber,
          type,
          category,
          date,
        });
      } else {
        await api.post("/transactions", {
          description,
          amount: amountNumber,
          type,
          category,
          date,
        });
      }

      triggerRefresh();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
            {/* título muda dependendo se é criação ou edição */}
            <h1 className="font-semibold">
              {transaction ? "Editar Transação" : "Nova Transação"}
            </h1>
            <X
              className="p-1 h-8 w-8 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
              onClick={onClose}
            />
          </div>
          <div className="flex items-center bg-gray-800 rounded-lg p-1 gap-1">
            <button
              className={`w-full font-semibold py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${type === "Receita" ? "bg-success/80" : "bg-gray-800 hover:bg-gray-700"}`}
              onClick={() => setType("Receita")}
            >
              + Receita
            </button>
            <button
              className={`w-full font-semibold py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${type === "Despesa" ? "bg-danger/80" : "bg-gray-800 hover:bg-gray-700"}`}
              onClick={() => setType("Despesa")}
            >
              - Despesa
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                id="descricao"
                className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                placeholder="Digite uma descrição..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="categoria">Categoria</label>
              <select
                className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="vazio" disabled className="bg-gray-800">
                  Selecione uma opção
                </option>
                {categoriaModalidade[type].map((item) => (
                  <option
                    key={item.texto}
                    value={item.icone + item.texto}
                    className="bg-gray-800"
                  >
                    {item.icone} {item.texto}
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="data">Data</label>
                <input
                  type="date"
                  name="data"
                  id="data"
                  className="w-full rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-2 rounded-lg transition-colors duration-200 mt-2 ${type === "Receita" ? "bg-success/80 hover:bg-success" : "bg-danger/80 hover:bg-danger"}`}
            >
              {loading
                ? "Salvando..."
                : transaction
                  ? "Salvar Alterações"
                  : "+ Adicionar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
