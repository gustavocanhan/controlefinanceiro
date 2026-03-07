"use client";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type AlertProps = {
  type: "sucess" | "error" | "warning";
  isOpen: boolean;
  onClose?: () => void;
};

const DURATION_MS = 4000;

export default function Alert({ type, isOpen, onClose }: AlertProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);

  const typeConfig = useMemo(
    () => ({
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
    }),
    [],
  );

  const Icon = typeConfig[type].Icon;

  const close = () => {
    setVisible(false);
    setProgress(100);
    onClose?.();
  };

  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      setVisible(false);
      return;
    }

    setVisible(true);
    setProgress(100);

    // garante que o browser aplicou o width 100 antes de mandar para 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProgress(0);
      });
    });

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      close();
    }, DURATION_MS);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    // não coloca close aqui, ele muda a cada render e reinicia o efeito
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="fixed z-50 top-4 right-4">
      <div className="relative bg-background border border-gray-600 rounded-md p-4 shadow-lg flex items-center w-[400px] gap-2">
        <div className="absolute top-0 left-0 h-1 w-full overflow-hidden rounded-t-md bg-gray-500">
          <div
            className={`h-full ${typeConfig[type].color}`}
            style={{
              width: `${progress}%`,
              transitionProperty: "width",
              transitionTimingFunction: "linear",
              transitionDuration: `${DURATION_MS}ms`,
            }}
          />
        </div>

        <Icon className="h-4 w-4" />
        <p>{typeConfig[type].text}</p>

        <button
          type="button"
          onClick={close}
          className="ml-auto text-sm opacity-70 hover:opacity-100"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
