"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import useAuthStore from "@/store/authStore";
import UltimaTransacao from "./UltimaTransacao";
import Modal from "../modal/Modal";
import TodasTransacoes from "../todastransacoes/TodasTransacoes";

interface TransactionsRecent {
  _id: string;
  description: string;
  amount: number;
  type: "Receita" | "Despesa";
  category: string;
  date: string;
}

export default function UltimasTransacoesContent() {
  const [data, setData] = useState<TransactionsRecent[]>([]);
  const [error, setError] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionsRecent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTodasTransacoesOpen, setIsTodasTransacoesOpen] = useState(false);

  const { refreshKey, triggerRefresh } = useAuthStore();

  const handleCloseTodasTransacoes = () => {
    setIsTodasTransacoesOpen(false);
  };

  const handleEdit = (item: TransactionsRecent) => {
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
      const response = await api.get("/transactions/recent");
      setData(response.data.data);
    };

    fetchData();
  }, [refreshKey]);

  if (!data) return <p>Carregando...</p>;

  return (
    <>
      <div className="bg-container-card p-8 rounded-xl border border-gray-800 shadow mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-black text-xl">Ultimas Transações</h1>
          <button
            onClick={() => setIsTodasTransacoesOpen(true)}
            className="text-gray-400 px-2 py-1 text-sm rounded-md border border-gray-800 hover:text-purple hover:border-purple transition-colors cursor-pointer"
          >
            Ver todas
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {data.map((item, key) => (
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
      {!isTodasTransacoesOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
      {!isModalOpen && (
        <TodasTransacoes
          isOpen={isTodasTransacoesOpen}
          onClose={handleCloseTodasTransacoes}
        />
      )}
    </>
  );
}
