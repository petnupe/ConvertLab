export default function ClinicaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-clinica flex flex-1 flex-col">{children}</div>;
}