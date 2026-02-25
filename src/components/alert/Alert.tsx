"use client";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

type AlertProps = {
  type: "sucess" | "error" | "warning";
  isOpen: boolean;
};

export default function Alert({ type, isOpen }: AlertProps) {
  const [visible, setVisible] = useState(isOpen);
  const [progress, setProgress] = useState(100);

  const typeConfig = {
    sucess: {
      text: "Transação criada com sucesso!",
      color: "bg-green-500",
      Icon: CheckCircle2,
    },
    error: {
      text: "Ocorreu um erro ao criar a transação.",
      color: "bg-red-500",
      Icon: XCircle,
    },
    warning: {
      text: "Atenção! Verifique os dados inseridos.",
      color: "bg-yellow-500",
      Icon: AlertTriangle,
    },
  };

  const Icon = typeConfig[type].Icon;

  const handleClose = () => {
    setVisible(false);
    setProgress(100);
  };

  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);
    setProgress(100);

    requestAnimationFrame(() => {
      setProgress(0);
    });

    const timer = setTimeout(() => {
      setVisible(false);
      handleClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, handleClose]);

  if (!visible) return null;

  return (
    <div className="fixed z-70 top-4 right-4">
      <div
        className={`relative bg-background border border-gray-600 rounded-md p-4 shadow-lg flex items-center w-100 gap-2 transition-all duration-200 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <div className="absolute top-0 left-0 h-1 w-full overflow-hidden rounded-t-md bg-gray-500">
          <div
            className={`h-full transition-all linear ${typeConfig[type].color}`}
            style={{ width: `${progress}%`, transitionDuration: `${4000}ms` }}
          />
        </div>
        <Icon className="h-4 w-4" />
        <p>{typeConfig[type].text}</p>
        <p>4 Secs.</p>
      </div>
    </div>
  );
}
