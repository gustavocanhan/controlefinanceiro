"use client";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import useAuthStore from "@/store/authStore";
import Modal from "../modal/Modal";
import UltimaTransacao from "../ultimastransacoes/UltimaTransacao";
import { categoriaModalidade } from "../modal/ModalData";

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
};

export default function TodasTransacoes({ isOpen, onClose }: ModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<"Receita" | "Despesa" | "vazio">("vazio");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refreshKey, triggerRefresh } = useAuthStore();

  const handleEdit = (item: Transaction) => {
    setSelectedTransaction(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/transactions/${userId}`);
      triggerRefresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar transação");
      console.error("Erro ao deletar transação:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/transactions/");
      setData(response.data.data);
    };

    if (isOpen) {
      setSearchTerm("");
      setType("vazio");
      setCategoria("");
    }

    fetchData();
  }, [refreshKey, isOpen]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as "Receita" | "Despesa" | "vazio");
    setCategoria(""); // 👈 reseta categoria ao trocar tipo
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType = type === "vazio" || item.type === type;

    const matchesCategory = !categoria || item.category === categoria; // 👈 corrigido

    return matchesSearch && matchesType && matchesCategory; // 👈 incluído matchesCategory
  });

  if (!data) return <p>Carregando...</p>;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />
        <div
          className={`relative h-[85vh] bg-card border border-gray-800 rounded-2xl p-6 w-full max-w-6xl shadow-2xl transition-transform duration-200 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}`}
        >
          <div className="flex justify-between items-center py-2">
            <h1 className="font-semibold">Todas as Transações</h1>
            <button
              onClick={onClose}
              className="p-1 h-8 w-8 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <X />
            </button>
          </div>
          <div className="flex w-full items-center justify-between p-1 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar transações..."
                className="w-md rounded-lg border border-gray-700 bg-transparent p-2 outline-none pl-10"
              />
              <X
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 hover:text-gray-600 cursor-pointer"
                onClick={(e) => setSearchTerm("")}
              />
            </div>
            <div className="flex items-center gap-4 pr-7">
              <select
                className="w-40 rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="vazio" className="bg-gray-800">
                  Filtrar por tipo
                </option>
                <option value="Receita" className="bg-gray-800">
                  Receita
                </option>
                <option value="Despesa" className="bg-gray-800">
                  Despesa
                </option>
              </select>
              <select
                className="w-50 rounded-lg border border-gray-700 bg-transparent p-2 mt-1.5 outline-none"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="" className="bg-gray-800">
                  Filtrar por categoria
                </option>
                {type !== "vazio" &&
                  categoriaModalidade[type].map((item) => (
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
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-4">
            {filteredData.map((item, key) => (
              <UltimaTransacao
                key={key}
                titulo={item.description}
                modalidade={item.category}
                data={item.date}
                valor={item.amount}
                tipo={item.type}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </>
  );
}
