"use client";
import { useState } from "react";
import Modal from "../modal/Modal";
import Header from "../header/Header";
import Alert from "../alert/Alert";

export default function ContentHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header openModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Alert type="sucess" isOpen={true} />
    </div>
  );
}
