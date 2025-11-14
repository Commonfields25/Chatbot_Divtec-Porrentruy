import { DIVTEC_CHUNKS } from './divtec';
import { FORMATIONS_CHUNKS } from './formations';
import { NEWTEC_CHUNKS } from './newtec';

import type { KnowledgeChunk } from '../types';

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  ...DIVTEC_CHUNKS,
  ...FORMATIONS_CHUNKS,
  ...NEWTEC_CHUNKS,
];
