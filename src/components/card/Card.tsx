type CardProps = {
  backgroundColor: string;
  borderColor: string;
  title: string;
  icon: string;
  value: number;
  valueColor: string;
  status: string;
};

export default function Card({
  backgroundColor,
  borderColor,
  title,
  icon,
  value,
  valueColor,
  status,
}: CardProps) {
  return (
    <div
      className={`p-4 rounded-lg ${backgroundColor} border ${borderColor} hover:-translate-y-2 transition-transform duration-300`}
    >
      <div className="flex items-center justify-between">
        <p className="uppercase font-bold text-sm text-gray-400 py-2">
          {title}
        </p>
        <span>{icon}</span>
      </div>
      <div>
        <h1 className={`${valueColor} font-black text-2xl mt-2`}>
          R$ {value.toLocaleString("pt-BR")}
        </h1>
        <p className="text-gray-500 text-xs mt-1">{status}</p>
      </div>
    </div>
  );
}
