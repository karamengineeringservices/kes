export type ProjectCategory =
  | "MILGEM-3"
  | "MILGEM-4"
  | "Gunboat"
  | "Shipbuilding"
  | "Ship Repair"
  | "International";

export type Project = {
  tag: string;
  category: ProjectCategory;
  title: string;
  scope: string;
  meta: string;
  scale: string;
  year: string;
};

// Real delivered work — Karachi Shipyard & Engineering Works (KS&EW) naval
// programmes, plus one international engagement. Ordered: MILGEM-3 -> MILGEM-4
// -> Gunboat -> Shipbuilding (general) -> Ship Repair -> International.
export const projects: Project[] = [
  {
    tag: "Outfitting · Naval Shipbuilding",
    category: "MILGEM-3",
    title: "Shipboard Piping Installation",
    scope:
      "Installation and erection of carbon steel, copper-nickel and stainless steel piping systems across multiple zones onboard the MILGEM-3 frigate, welded and aligned to Classification Society standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-3 Programme",
    scale: "1,263 m of piping installed",
    year: "2023"
  },
  {
    tag: "Outfitting · Naval Shipbuilding",
    category: "MILGEM-3",
    title: "Hatches, Doors & Foundation Installation",
    scope:
      "Structural installation of hatches, doors and foundation welding aboard the MILGEM-3 frigate, executed in coordination with Deck & Hold and Quality Control to Classification Society standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-3 Programme",
    scale: "85 hatches & doors · 8,000 kg foundations",
    year: "2022"
  },
  {
    tag: "Fabrication · Naval Shipbuilding",
    category: "MILGEM-3",
    title: "Foundation Welding",
    scope:
      "Structural foundation welding aboard the MILGEM-3 frigate, executed in coordination with Deck & Hold and Quality Control to Classification Society standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-3 Programme",
    scale: "12,000 kg foundation welding",
    year: "2024"
  },
  {
    tag: "Grit Blasting · Naval Shipbuilding",
    category: "MILGEM-4",
    title: "Grit Blasting of Fabricated Steel Hull Blocks",
    scope:
      "Surface preparation of four fabricated hull blocks for the MILGEM-4 class frigate, grit blasted to Classification Society finish standards ahead of painting and outfitting.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-4 Programme",
    scale: "3,800+ m² blasted (4 hull blocks)",
    year: "2023"
  },
  {
    tag: "Outfitting · Naval Shipbuilding",
    category: "MILGEM-4",
    title: "Hatches, Doors & Foundation Installation",
    scope:
      "Structural installation of hatches, doors and foundation welding aboard the MILGEM-4 frigate, executed in coordination with Deck & Hold and Quality Control to Classification Society standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-4 Programme",
    scale: "85 hatches & doors · 19,000 kg foundations",
    year: "2023"
  },
  {
    tag: "Fabrication · Naval Shipbuilding",
    category: "MILGEM-4",
    title: "Steel Hull Block Fabrication",
    scope:
      "Full pre-fabrication, sub-assembly, complete block fabrication, welding and fairing of eleven steel hull blocks, certified to TÜRK LOYDU (TL) classification standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-4 Programme",
    scale: "239,600+ kg across 11 hull blocks",
    year: "2022"
  },
  {
    tag: "Outfitting · Naval Shipbuilding",
    category: "MILGEM-4",
    title: "Carbon Steel Piping Installation",
    scope:
      "Installation and erection of carbon steel piping systems across multiple zones onboard the MILGEM-4 frigate, welded and aligned to Classification Society standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-4 Programme",
    scale: "2,454 m of piping installed",
    year: "2023"
  },
  {
    tag: "Outfitting · Naval Shipbuilding",
    category: "MILGEM-4",
    title: "Copper-Nickel Piping Installation",
    scope:
      "Installation and erection of copper-nickel piping systems across multiple zones onboard the MILGEM-4 frigate, welded and aligned to Classification Society standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · MILGEM-4 Programme",
    scale: "3,300 m of piping installed",
    year: "2023"
  },
  {
    tag: "Fabrication · Naval Shipbuilding",
    category: "Gunboat",
    title: "Gunboat Hull Block Fabrication",
    scope:
      "Full fabrication chain, jig fabrication, pre-fabrication, complete block assembly, welding, hot forming and fairing, of five steel hull blocks for a gunboat programme, certified to TÜRK LOYDU classification standards.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · Gunboat Programme",
    scale: "76,800 kg across 5 hull blocks",
    year: "2022"
  },
  {
    tag: "Fabrication · Shipbuilding",
    category: "Shipbuilding",
    title: "Welding, Grinding & Fairing — Vessels Under Construction",
    scope:
      "Structural welding, grinding and fairing across vessels under construction, executed to Classification Society standards with certified welders, full welding equipment and daily progress reporting.",
    meta: "Karachi Shipyard & Engineering Works Ltd. (KS&EW)",
    scale: "200,000 kg of welding work",
    year: "2022"
  },
  {
    tag: "Grit Blasting · Ship Repair",
    category: "Ship Repair",
    title: "Grit Blasting & Painting",
    scope:
      "Grit blasting and spray-applied protective coating of plates and profiles onboard FD-IV, completed within a 35-day turnaround for Karachi Shipyard's Ship Repair Department.",
    meta: "Karachi Shipyard & Engineering Works (KS&EW) · Ship Repair Division",
    scale: "2,500 m² blasted & coated",
    year: "2021"
  },
  {
    tag: "Fabrication · International",
    category: "International",
    title: "Steel Plate Forming — Jubail, Saudi Arabia",
    scope:
      "Hot and cold forming of forty-one steel plates to precise geometry at Maritime Industrial Services Arabia's Jubail workshop, with on-site technical supervision and template-verified quality control.",
    meta: "Maritime Industrial Services Arabia (MISA) · Jubail Industrial City, Saudi Arabia",
    scale: "41 plates formed · 4-week mobilization",
    year: "2026"
  }
];

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "MILGEM-3",
  "MILGEM-4",
  "Gunboat",
  "Shipbuilding",
  "Ship Repair",
  "International"
];
