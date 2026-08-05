export default function PetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-pet flex flex-1 flex-col">{children}</div>;
}