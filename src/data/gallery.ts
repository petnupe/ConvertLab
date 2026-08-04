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
    after: "https://images.unsplash.com/photo-1609840114035-815d4c134f66",
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
    before: "https://images.unsplash.com/photo-1604848698030-c434ba08c3f7",
    after: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f",
    description:
      "Três tons mais claro em uma única sessão, com protocolo de dessensibilização e conforto total.",
  },
  {
    case: "Caso 04 — Alinhamento invisível",
    technique: "Alinhadores transparentes",
    before: "https://images.unsplash.com/photo-1609813563870-6c1d80a7a0e9",
    after: "https://images.unsplash.com/photo-1589729327602-8b958a2e19c3",
    description:
      "Correção de apinhamento discreto em oito meses, sem bráquetes e sem mudar a rotina.",
  },
];