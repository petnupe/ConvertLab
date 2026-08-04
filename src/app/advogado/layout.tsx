export default function AdvogadoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-advogado flex flex-1 flex-col">{children}</div>;
}