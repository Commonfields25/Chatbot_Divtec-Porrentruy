// Ce fichier assemble les différentes parties de la base de connaissances en une seule constante.
import { DIVTEC_CHUNKS } from './divtec';
import { FORMATIONS_CHUNKS } from './formations';
import { NEWTEC_CHUNKS } from './newtec';

// Interface pour structurer chaque morceau de connaissance.
export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

// Combinaison des différentes parties pour former la base de connaissances complète et structurée.
export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  ...DIVTEC_CHUNKS,
  ...FORMATIONS_CHUNKS,
  ...NEWTEC_CHUNKS,
];
