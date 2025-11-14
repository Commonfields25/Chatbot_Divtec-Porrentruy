import type { KnowledgeChunk } from '../types';

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
  {
    id: 'ecole-des-metiers-techniques',
    title: 'Ecole des Métiers Techniques (EMT)',
    content: "L'Ecole des Métiers Techniques à Porrentruy propose des formations initiales de type AFP (Attestation Fédérale de Formation Professionnelle) et CFC (Certificat Fédéral de Capacité) en école des métiers.",
    keywords: ['emt', 'ecole des métiers', 'formations', 'afp', 'cfc', 'apprentissage'],
  },
  {
    id: 'ecole-professionnelle-technique',
    title: 'Ecole Professionnelle Technique (EPT)',
    content: "L'Ecole Professionnelle Technique dispense les cours théoriques pour les formations AFP et CFC, que ce soit en mode dual (entreprise + école) ou en école des métiers.",
    keywords: ['ept', 'ecole professionnelle', 'cours théoriques', 'dual', 'entreprise'],
  },
  {
    id: 'maturite-professionnelle-technique-details',
    title: 'Maturité Professionnelle Technique (MPT)',
    content: "La Division Technique propose une formation post-CFC en maturité professionnelle, avec une orientation en Technique, architecture et sciences de la vie (TAV).",
    keywords: ['mpt', 'maturité professionnelle', 'post-cfc', 'tav', 'technique', 'architecture', 'sciences de la vie'],
  },
  {
    id: 'ecole-superieure-technique-details',
    title: 'Ecole Supérieure Technique (ES)',
    content: "L'Ecole Supérieure (ES) de la Division Technique offre des formations supérieures post-CFC qui sont reconnues par la Confédération suisse.",
    keywords: ['es', 'école supérieure', 'formation supérieure', 'post-cfc', 'technicien es'],
  },
  {
    id: 'agenda-admission-mpt-delai',
    title: "Délai d'inscription à l'examen d'admission MPT",
    content: "Le délai d’inscription à l’examen d’admission pour la Maturité Professionnelle Technique est le 22 Mai 2026.",
    keywords: ['agenda', 'délai', 'inscription', 'admission', 'mpt', 'maturité professionnelle'],
  },
  {
    id: 'agenda-examen-admission-mpt',
    title: 'Examen d’admission MPT',
    content: "L'examen d’admission pour la maturité professionnelle technique, architecture et sciences de la vie aura lieu le 06 Juin 2026.",
    keywords: ['agenda', 'examen', 'admission', 'mpt', 'maturité professionnelle'],
  },
  {
    id: 'agenda-inscription-mpt-delai',
    title: 'Délai d’inscription en MPT 2026-2027',
    content: "Le délai d’inscription en MPT pour l'année 2026-2027 est le 19 Juin 2026.",
    keywords: ['agenda', 'délai', 'inscription', 'mpt', 'maturité professionnelle'],
  },
];
