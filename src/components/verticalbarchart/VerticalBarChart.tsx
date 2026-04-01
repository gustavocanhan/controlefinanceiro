"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { meses } from "./Meses";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function VerticalBarChart() {
  const [chartData, setChartData] = useState<number[][]>([[], []]);

  const { refreshKey } = useAuthStore();

  useEffect(() => {
    const fetchChart = async () => {
      const response = await api.get("/transactions/monthly-chart");
      const result = response.data.data;

      const mesAtual = new Date().getMonth() + 1;
      const anoAtual = new Date().getFullYear();

      const ultimosSeisMeses = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(anoAtual, mesAtual - 1 - (5 - i), 1);
        return { month: date.getMonth() + 1, year: date.getFullYear() };
      });

      const receitas = ultimosSeisMeses.map((m) => {
        const found = result.find(
          (r: any) =>
            r._id.month === m.month &&
            r._id.year === m.year &&
            r._id.type === "Receita",
        );
        return found?.total || 0;
      });

      const despesas = ultimosSeisMeses.map((m) => {
        const found = result.find(
          (r: any) =>
            r._id.month === m.month &&
            r._id.year === m.year &&
            r._id.type === "Despesa",
        );
        return found?.total || 0;
      });

      setChartData([receitas, despesas]);
    };

    fetchChart();
  }, [refreshKey]);

  const mesAtual = new Date().getMonth() + 1;
  const ultimosMeses: string[] = [];

  for (let i = 5; i >= 0; i--) {
    const indice = (mesAtual - 1 - i + 12) % 12;
    ultimosMeses.push(meses[indice]);
  }

  const data = {
    labels: ultimosMeses,
    datasets: [
      {
        label: "Receitas",
        data: chartData[0],
        backgroundColor: (context: any) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "rgba(16, 164, 116, 0.85)";

          const g = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          g.addColorStop(0, "rgba(18, 76, 63, 0.90)"); // embaixo bem escuro
          g.addColorStop(0.55, "rgba(17, 125, 92, 0.90)");
          g.addColorStop(1, "rgba(16, 164, 116, 0.95)"); // topo mais vivo
          return g;
        },
        borderRadius: 10,
      },
      {
        label: "Despesas",
        data: chartData[1],
        backgroundColor: (context: any) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "rgba(215, 57, 85, 0.85)";

          const g = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          g.addColorStop(0, "rgba(93, 35, 51, 0.90)"); // embaixo vinho
          g.addColorStop(0.55, "rgba(156, 47, 69, 0.90)");
          g.addColorStop(1, "rgba(215, 57, 85, 0.95)"); // topo pink forte
          return g;
        },
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 50,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        ticks: { display: false }, // tira 0, 100, 200...
        grid: { display: false }, // (opcional) tira as linhas horizontais
        border: { display: false }, // (opcional) tira a linha do eixo
      },
    },
  };

  return (
    <div className="w-full max-w-full h-50 max-h-50">
      <Bar data={data} options={options} />
    </div>
  );
}
