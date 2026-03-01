"use client";
import Alert from "../alert/Alert";
import Modal from "../modal/Modal";
import { useState } from "react";

type ModalContentProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function ModalContent({
  isModalOpen,
  setIsModalOpen,
}: ModalContentProps) {
  return (
    <div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
