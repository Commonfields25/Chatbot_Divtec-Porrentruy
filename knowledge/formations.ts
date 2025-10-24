/**
 * @file Ce fichier contient les informations sur les formations proposées par la DIVTEC.
 * @author Scail-in
 * @see {@link https://github.com/scail-in/chatbot-divtec-porrentruy}
 */
import type { KnowledgeChunk } from './index';

/**
 * @const {KnowledgeChunk[]}
 * @description Contient les informations sur les formations proposées par la DIVTEC.
 */
export const FORMATIONS_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'formation-cfc-general',
    title: 'Formations Initiales (CFC)',
    content: `Le **Certificat Fédéral de Capacité (CFC)** se déroule en mode **dual** (école et entreprise). La formation est gratuite, l'apprenti recevant un salaire.`,
    keywords: ['cfc', 'certificat fédéral de capacité', 'dual', 'apprentissage', 'salaire'],
  },
  {
    id: 'formation-polymecanicien',
    title: 'Polymécanicien-ne CFC',
    content: `- **Description :** Fabrication de pièces, assemblage d'appareils et maintenance de systèmes de production (orientations : fabrication CNC ou montage).\n- **Matières clés :** Techniques de fabrication (tournage, fraisage), Programmation CNC, Dessin technique, Assemblage, Maintenance.\n- **Lieu :** Porrentruy`,
    keywords: ['polymécanicien', 'cfc', 'cnc', 'fabrication', 'fraisage', 'tournage', 'maintenance', 'porrentruy'],
  },
  {
    id: 'formation-informaticien',
    title: 'Informaticien-ne CFC',
    content: `- **Description :** Spécialisation en développement d'applications ou en technique des systèmes informatiques.\n- **Matières clés :** Algorithmique, Programmation (Python, C#, Java), Bases de données (SQL), Réseaux (TCP/IP), Systèmes d'exploitation.\n- **Lieu :** Delémont`,
    keywords: ['informaticien', 'cfc', 'développement', 'systèmes', 'programmation', 'python', 'java', 'sql', 'réseaux', 'delémont'],
  },
  {
    id: 'formation-micromecanicien',
    title: 'Micromécanicien-ne CFC',
    content: `- **Description :** Production de composants de très petite taille pour des secteurs comme l'horlogerie et le medtech.\n- **Matières clés :** Usinage de haute précision, Étampage, Assemblage de mécanismes horlogers, Contrôle qualité.\n- **Lieu :** Porrentruy`,
    keywords: ['micromécanicien', 'cfc', 'horlogerie', 'medtech', 'précision', 'étampage', 'porrentruy'],
  },
  {
    id: 'formation-dessinateur',
    title: 'Dessinateur-trice-constructeur-trice industriel-le CFC',
    content: `- **Description :** Conception et modélisation 3D de pièces et d'ensembles mécaniques.\n- **Matières clés :** CAO 3D, Dimensionnement, Choix des matériaux, Normes de dessin.\n- **Lieu :** Porrentruy`,
    keywords: ['dessinateur', 'constructeur', 'industriel', 'cfc', 'cao', '3d', 'conception', 'modélisation', 'porrentruy'],
  },
  {
    id: 'formation-automaticien',
    title: 'Automaticien-ne CFC',
    content: `- **Description :** Développement et maintenance de systèmes automatisés, commandes et robots industriels.\n- **Matières clés :** Électrotechnique, Schématique, Programmation d'automates (API), Hydraulique, Pneumatique, Robotique.\n- **Lieu :** Porrentruy`,
    keywords: ['automaticien', 'cfc', 'automate', 'api', 'robotique', 'pneumatique', 'hydraulique', 'porrentruy'],
  },
  {
    id: 'formation-mpt',
    title: 'Maturité Professionnelle Technique (MPT)',
    content: `- **Description :** La MPT peut être suivie pendant ou après le CFC. Elle donne accès aux **Hautes Écoles Spécialisées (HES)**.\n- **Frais :** Gratuite si suivie en parallèle du CFC.\n- **Lieu :** Porrentruy`,
    keywords: ['mpt', 'maturité professionnelle technique', 'hes', 'hautes écoles', 'cfc', 'porrentruy'],
  },
  {
    id: 'formation-es-general',
    title: 'Formations Supérieures (ES)',
    content: `Les formations d'**École Supérieure (ES)** s'adressent aux titulaires d'un CFC ou titre équivalent. Elles sont payantes (subventions cantonales possibles).`,
    keywords: ['es', 'école supérieure', 'formations supérieures', 'cfc', 'payant', 'subventions'],
  },
  {
    id: 'formation-es-systemes-industriels',
    title: 'Technicien-ne ES en Systèmes Industriels',
    content: `- **Description :** Gestion, optimisation et maintenance de chaînes de production automatisées (Industrie 4.0).\n- **Modules :** Gestion de projet, Logistique, Automatisation et robotique, Maintenance 4.0, Qualité, Conception (CAO).\n- **Débouchés :** Responsable de production, Chef de projet industrialisation.\n- **Lieu :** Porrentruy`,
    keywords: ['technicien es', 'systèmes industriels', 'industrie 4.0', 'automatisation', 'logistique', 'maintenance', 'porrentruy'],
  },
  {
    id: 'formation-es-informatique-gestion',
    title: 'Technicien-ne ES en Informatique de gestion',
    content: `- **Description :** Analyse des besoins d'entreprise et développement de solutions logicielles sur mesure.\n- **Modules :** Développement orienté objet, Bases de données (SQL/NoSQL), Gestion de projets Agile/Scrum, Analyse d'affaires (UML), ERP, Cybersécurité, Cloud.\n- **Technologies :** C#, .NET, Java, SQL, JavaScript/TypeScript.\n- **Débouchés :** Développeur, Chef de projet IT, Analyste d'affaires.\n- **Lieu :** Delémont`,
    keywords: ['technicien es', 'informatique de gestion', 'développeur', 'agile', 'scrum', 'sql', 'c#', 'delémont'],
  },
  {
    id: 'formation-es-informatique-industrielle',
    title: 'Technicien-ne ES en Informatique Industrielle',
    content: `- **Description :** Spécialisation à l'intersection de l'informatique et de l'automatique pour piloter des systèmes de production complexes (IIoT, Industrie 4.0).\n- **Modules :** Programmation de systèmes embarqués (C/C++), Réseaux industriels (OPC UA), Supervision (SCADA), Robotique avancée, Vision industrielle.\n- **Débouchés :** Spécialiste en automation, Développeur de systèmes embarqués.\n- **Lieu :** Porrentruy`,
    keywords: ['technicien es', 'informatique industrielle', 'iiot', 'embarqué', 'scada', 'robotique', 'automation', 'porrentruy'],
  },
];
