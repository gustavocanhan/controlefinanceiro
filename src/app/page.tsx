import CardContent from "@/components/card/CardContent";
import GastosCategoriaContent from "@/components/gastocategoria/GastosCategoriaContent";
import UltimasTransacoesContent from "@/components/ultimastransacoes/UltimasTransacoesContent";
import VerticalBarChartContent from "@/components/verticalbarchart/VerticalBarChartContent";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-8">
      <CardContent />
      <div className="flex flex-col gap-8 lg:flex-row mt-8 max-h-100">
        <VerticalBarChartContent />
        <GastosCategoriaContent />
      </div>
      <UltimasTransacoesContent />
    </main>
  );
}
