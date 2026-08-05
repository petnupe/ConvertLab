export default function ConstrutoraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-construtora flex flex-1 flex-col">{children}</div>;
}