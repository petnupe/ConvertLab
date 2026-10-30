"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  ShieldAlert,
  User,
} from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Falha no login.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="theme-convertscale flex min-h-screen flex-col items-center justify-center bg-[#0a0812] px-6">
      <div className="w-full max-w-sm">
        <div className="cl-card rounded-3xl p-8">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 text-white">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-xl font-bold tracking-tight text-white">
            Área restrita
          </h1>
          <p className="mt-1 text-sm text-white/55">
            Login de administrador do ConvertScale.
          </p>

          <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80">
                E-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 pr-12 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
                />
                <span className="pointer-events-none absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-violet-600 text-white">
                  <User className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-white/80">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 pr-12 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-white transition-colors hover:bg-violet-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-2.5 text-sm text-red-200"
              >
                <ShieldAlert
                  className="h-4 w-4 shrink-0 text-red-300"
                  aria-hidden="true"
                />
                <span>{error}</span>
              </div>
            ) : null}

            <div className="mt-1 flex justify-center">
              <Link
                href="/"
                className="text-sm text-white/50 transition-colors hover:text-white/80"
              >
                ← Voltar à landing
              </Link>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-14px_rgba(124,58,237,0.9)] transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <LogIn className="h-4 w-4" aria-hidden="true" />
              )}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}