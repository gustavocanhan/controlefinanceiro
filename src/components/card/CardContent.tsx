"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Card from "./Card";
import useAuthStore from "@/store/authStore";

interface Summary {
  receita: number;
  despesa: number;
  saldo: number;
  economia: number;
  percentEconomia: number;
  totalReceitas: number;
  totalDespesas: number;
}

export default function CardContent() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  const { refreshKey } = useAuthStore();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/transactions/summary");
        setSummary(response.data.data);
      } catch (err) {
        console.error("Erro ao buscar resumo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [refreshKey]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 items-center mt-8">
      <Card
        backgroundColor="bg-brand-gradient"
        borderColor="border-purple-900/50"
        title="Saldo disponível"
        icon="💰"
        value={summary?.saldo ?? 0}
        valueColor={summary!.saldo > 0 ? "text-purple-500" : "text-red-500"}
        status={summary!.saldo > 0 ? "✅ Saldo positivo" : "❌ Saldo negativo"}
      />
      <Card
        backgroundColor="bg-emerald-gradient"
        borderColor="border-green-900/50"
        title="Receitas do mês"
        icon="📈"
        value={summary?.receita ?? 0}
        valueColor="text-green-500"
        status={`${summary?.totalReceitas} transação`}
      />
      <Card
        backgroundColor="bg-rose-soft-gradient"
        borderColor="border-red-900/50"
        title="Despesas do mês"
        icon="📉"
        value={summary?.despesa ?? 0}
        valueColor="text-red-500"
        status={`${summary?.totalDespesas} transação`}
      />
      <Card
        backgroundColor="bg-sky-gradient"
        borderColor="border-cyan-900/50"
        title="Economia do mês"
        icon="💹"
        value={summary?.economia ?? 0}
        valueColor="text-cyan-400"
        status={`${summary?.percentEconomia.toFixed(1)}% da receita`}
      />
    </div>
  );
}
