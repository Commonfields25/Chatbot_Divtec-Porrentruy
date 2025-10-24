export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
