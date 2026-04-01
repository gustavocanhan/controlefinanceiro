"use client";
import { useEffect, useState } from "react";
import GastosCategoria from "./GastosCategoria";
import api from "@/lib/api";
import useAuthStore from "@/store/authStore";

interface CategoriaData {
  category: string;
  total: number;
  percentual: number;
}

export default function GastosCategoriaContent() {
  const [data, setData] = useState<CategoriaData[]>([]);
  const { refreshKey } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/transactions/expenses-by-category");
      setData(response.data.data);
    };

    fetchData();
  }, [refreshKey]);

  if (!data) return <p>Carregando...</p>;

  return (
    <div className="lg:basis-2/5 bg-container-card p-8 rounded-xl border border-gray-800 shadow">
      <h1 className="font-black text-xl mb-8">Gastos por Categoria</h1>
      <div className="max-h-60 overflow-y-auto scrollbar-discreta pr-2">
        {data.map((item, index) => (
          <GastosCategoria
            key={index}
            categoria={item.category}
            valor={item.total}
            percentual={item.percentual.toFixed(0)}
          />
        ))}
      </div>
    </div>
  );
}
