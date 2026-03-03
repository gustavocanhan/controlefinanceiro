import VerticalBarChart from "./VerticalBarChart";

export default function VerticalBarChartContent() {
  return (
    <div className="lg:basis-3/5 bg-container-card p-8 rounded-xl border border-gray-800 shadow">
      <h1 className="font-black text-xl mb-8">Fluxo Mensal</h1>
      <VerticalBarChart />
      <div className="flex items-center gap-6 mt-8">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
          <p>Receitas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
          <p>Despesas</p>
        </div>
      </div>
    </div>
  );
}
