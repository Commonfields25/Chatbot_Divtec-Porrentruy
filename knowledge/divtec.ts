// Contient les informations générales sur la DIVTEC, sa structure et les admissions.
import type { KnowledgeChunk } from './index';

export const DIVTEC_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'divtec-presentation',
    title: 'Présentation de la DIVTEC',
    content: `La **DIVTEC** (Division Technique) est le pôle de formation technique du **CEJEF** (Centre jurassien d'enseignement et de formation). C'est le centre de référence pour les métiers de l'industrie et de la technique dans le canton du Jura, en Suisse. L'école est reconnue pour sa **formation duale** et ses liens étroits avec les entreprises de l'Arc jurassien.`,
    keywords: ['divtec', 'cejef', 'présentation', 'général', 'formation duale', 'jura', 'suisse'],
  },
  {
    id: 'divtec-poles',
    title: 'Pôles de Formation de la DIVTEC',
    content: `La DIVTEC est organisée sur deux sites principaux, chacun avec ses spécialisations :
- **Pôle de Porrentruy :**
  - **Domaines :** Industrie, mécanique, microtechnique, innovation.
  - **Spécificité :** Accueille l'**Espace New Tec**, le pôle d'innovation.
- **Pôle de Delémont :**
  - **Domaines :** Métiers du bâtiment, informatique (gestion et systèmes).`,
    keywords: ['pôles', 'sites', 'porrentruy', 'delémont', 'spécialisations', 'domaines', 'newtec', 'informatique'],
  },
  {
    id: 'divtec-admission',
    title: 'Admission et Contact à la DIVTEC',
    content: `- **Processus d'admission :** Varie selon la formation.
  - **CFC :** Nécessite un contrat d'apprentissage avec une entreprise.
  - **ES (École Supérieure) :** Admission sur dossier et entretien.
- **Séances d'information :** Des séances sont organisées régulièrement pour les futurs étudiants.
- **Contact :** Pour des informations détaillées, il est recommandé de contacter directement le secrétariat du pôle de formation concerné.`,
    keywords: ['admission', 'contact', 'inscription', 'cfc', 'es', 'contrat apprentissage', 'séance information', 'secrétariat'],
  },
];
