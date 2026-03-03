import CardContent from "@/components/card/CardContent";
import GastosCategoriaContent from "@/components/gastocategoria/GastosCategoriaContent";
import VerticalBarChartContent from "@/components/verticalbarchart/VerticalBarChartContent";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-8">
      <CardContent />
      <div className="flex flex-col gap-4 lg:flex-row mt-8 max-h-100">
        <VerticalBarChartContent />
        <GastosCategoriaContent />
      </div>
    </main>
  );
}
