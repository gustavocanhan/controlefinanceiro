"use client";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "@/store/authStore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuthStore();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <main className="flex h-screen w-full">
      <div className="hidden lg:flex w-1/2 flex-col bg-purple justify-center items-center">
        <div className="w-120">
          <h1 className="text-6xl font-black">
            Controle
            <br />
            Financeiro
          </h1>
          <p className="mt-8 text-2xl">
            Tenha total controle da sua vida financeira com uma plataforma
            simples, rápida e intuitiva.
          </p>
        </div>
      </div>
      <div className="flex lg:w-1/2 flex-col items-center justify-center px-4">
        <TrendingUp className="text-purple bg-gray-900/60 rounded-lg h-12 w-12 p-1.5 mb-4" />
        <div className="border-2 shadow border-purple p-4 rounded-xl lg:w-md w-full">
          <h1 className="text-3xl font-bold pt-2 pb-4 text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Nome</label>
              <input
                type="text"
                className="bg-purple rounded-md py-1 pl-2 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mt-6">
              <label>E-mail</label>
              <input
                type="email"
                className="bg-purple rounded-md py-1 pl-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mt-6">
              <label>Senha</label>
              <input
                type="password"
                className="bg-purple rounded-md py-1 pl-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="mt-6 bg-purple px-4 py-1 rounded cursor-pointer hover:bg-purple/80 duration-200">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
