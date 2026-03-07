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
import { faker } from "@faker-js/faker";
import { meses } from "./Meses";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function VerticalBarChart() {
  const mesAtual = new Date().getMonth() + 1;
  const qtdMesesEscolhidos = 6;
  const ultimosMeses: string[] = [];

  for (let i = 1; i <= qtdMesesEscolhidos; i++) {
    const indice = (mesAtual - i + 12) % 12;
    ultimosMeses.push(meses[indice]);
  }

  const labels = ultimosMeses.reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Receitas",
        data: ultimosMeses.map(() => faker.number.int({ min: 0, max: 1000 })),
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
        data: ultimosMeses.map(() => faker.number.int({ min: 0, max: 1000 })),
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
