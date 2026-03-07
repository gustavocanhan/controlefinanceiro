import { categoriaModalidade } from "../modal/ModalData";
import GastosCategoria from "./GastosCategoria";
import { faker } from "@faker-js/faker";

export default function GastosCategoriaContent() {
  return (
    <div className="lg:basis-2/5 bg-container-card p-8 rounded-xl border border-gray-800 shadow">
      <h1 className="font-black text-xl mb-8">Gastos por Categoria</h1>
      <div className="max-h-60 overflow-y-auto scrollbar-discreta pr-2">
        {categoriaModalidade["despesa"].map((item, index) => (
          <GastosCategoria
            key={index}
            categoria={item.icone + " " + item.texto}
            valor={faker.number.float({ min: 0, max: 1000 })}
            percentual={faker.number.float({ min: 0, max: 100 }).toFixed(0)}
          />
        ))}
      </div>
    </div>
  );
}
