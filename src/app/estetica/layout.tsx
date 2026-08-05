export default function EsteticaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-estetica flex flex-1 flex-col">{children}</div>;
}