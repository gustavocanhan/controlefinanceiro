import { TrendingUp, Plus } from "lucide-react";

type HeaderProps = {
  openModal: () => void;
};

export default function Header({ openModal }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 mx-auto">
      <div className="flex items-center justify-between max-w-5xl mx-auto p-4">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="text-purple bg-gray-900/60 rounded-lg h-8 w-8 p-1.5" />
          <h1 className="text-sm md:text-lg">Controle Financeiro</h1>
        </div>
        <div>
          <button
            onClick={openModal}
            className="flex items-center gap-1.5 bg-purple text-white rounded-lg px-4 py-1.5 text-sm cursor-pointer hover:bg-purple/50 transition-colors duration-200"
          >
            <Plus size={16} />
            <p className="inline md:hidden">Novo</p>
            <p className="hidden md:inline">Nova Transação</p>
          </button>
        </div>
      </div>
    </header>
  );
}
