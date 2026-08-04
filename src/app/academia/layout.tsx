export default function AcademiaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-academia flex flex-1 flex-col">{children}</div>;
}