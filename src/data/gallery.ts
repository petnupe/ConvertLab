export type GalleryItem = {
  case: string;
  technique: string;
  before: string;
  after: string;
  description: string;
};

export const gallery: GalleryItem[] = [
  {
    case: "Caso 01 — Restauração estética",
    technique: "Facetas em porcelana",
    before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99",
    after: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    description:
      "Correção de desgaste e manchas em seis elementos anteriores, com resultado natural e harmônico.",
  },
  {
    case: "Caso 02 — Reabilitação total",
    technique: "Implantes sobre prótese",
    before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
    after: "https://images.unsplash.com/photo-1588776814546-daab30f310ce",
    description:
      "Reabilitação completa do sorriso com implantes e coroas, devolvendo mastigação e estética.",
  },
  {
    case: "Caso 03 — Clareamento profissional",
    technique: "Clareamento a laser",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95",
    after: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
    description:
      "Três tons mais claro em uma única sessão, com protocolo de dessensibilização e conforto total.",
  },
  {
    case: "Caso 04 — Alinhamento invisível",
    technique: "Alinhadores transparentes",
    before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99",
    after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95",
    description:
      "Correção de apinhamento discreto em oito meses, sem bráquetes e sem mudar a rotina.",
  },
];