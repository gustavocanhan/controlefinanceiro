"use client";
import { useState } from "react";
import Card from "./Card";

export default function CardContent() {
  const [saldoTotal, setSaldoTotal] = useState(10000);
  const [receitas, setReceitas] = useState(5000);
  const [despesas, setDespesas] = useState(3000);
  const [economia, setEconomia] = useState(2000);

  const [countReceitas, setCountReceitas] = useState(0);
  const [countDespesas, setCountDespesas] = useState(0);

  const [percentEconomia, setPercentEconomia] = useState(
    (economia / receitas) * 100,
  );

  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-8">
      <Card
        backgroundColor="bg-brand-gradient"
        borderColor="border-purple-900/50"
        title="Saldo Total"
        icon="💰"
        value={saldoTotal}
        valueColor="text-purple-500"
        status={
          saldoTotal > despesas ? "✅ Saldo positivo" : "❌ Saldo negativo"
        }
      />
      <Card
        backgroundColor="bg-emerald-gradient"
        borderColor="border-green-900/50"
        title="Receitas do mês"
        icon="📈"
        value={receitas}
        valueColor="text-green-500"
        status={`${countReceitas} transação`}
      />
      <Card
        backgroundColor="bg-rose-soft-gradient"
        borderColor="border-red-900/50"
        title="Despesas do mês"
        icon="📉"
        value={despesas}
        valueColor="text-red-500"
        status={`${countDespesas} transação`}
      />
      <Card
        backgroundColor="bg-sky-gradient"
        borderColor="border-cyan-900/50"
        title="Economia do mês"
        icon="💹"
        value={economia}
        valueColor="text-cyan-400"
        status={`${percentEconomia}% da receita`}
      />
    </div>
  );
}
