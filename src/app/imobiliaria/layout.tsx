export default function ImobiliariaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="theme-imobiliaria flex flex-1 flex-col">{children}</div>
  );
}