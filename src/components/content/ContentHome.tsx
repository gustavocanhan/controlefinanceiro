"use client";
import { useState } from "react";
import Modal from "../modal/Modal";
import Header from "../header/Header";
import Alert from "../alert/Alert";

export default function ContentHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<{
    type: "sucess" | "error" | "warning";
    isOpen: boolean;
  }>({ type: "sucess", isOpen: false });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    (async () => {
      try {
        console.log("Enviando dados...");
        await new Promise((r) => setTimeout(r, 500));

        //if (Math.random() < 0.5) throw new Error("Erro aleatório");
        setIsModalOpen(false);

        setAlert({ type: "sucess", isOpen: true });
      } catch (err) {
        setAlert({ type: "error", isOpen: true });
        setIsModalOpen(false);
      }
    })();
  }
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header openModal={openModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleSubmit={handleSubmit}
      />
      <Alert
        type={alert.type}
        isOpen={alert.isOpen}
        onClose={() => setAlert((a) => ({ ...a, isOpen: false }))}
      />
    </div>
  );
}
