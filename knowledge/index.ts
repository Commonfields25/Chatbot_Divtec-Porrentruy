/**
 * @file Ce fichier assemble les différentes parties de la base de connaissances en une seule constante.
 * @author Scail-in
 * @see {@link https://github.com/scail-in/chatbot-divtec-porrentruy}
 */
import { DIVTEC_CHUNKS } from './divtec';
import { FORMATIONS_CHUNKS } from './formations';
import { NEWTEC_CHUNKS } from './newtec';

/**
 * @interface KnowledgeChunk
 * @description Interface pour structurer chaque morceau de connaissance.
 * @property {string} id - L'identifiant unique du morceau de connaissance.
 * @property {string} title - Le titre du morceau de connaissance.
 * @property {string} content - Le contenu du morceau de connaissance.
 * @property {string[]} keywords - Une liste de mots-clés associés au morceau de connaissance.
 */
export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

/**
 * @const {KnowledgeChunk[]}
 * @description Combinaison des différentes parties pour former la base de connaissances complète et structurée.
 */
export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  ...DIVTEC_CHUNKS,
  ...FORMATIONS_CHUNKS,
  ...NEWTEC_CHUNKS,
];
