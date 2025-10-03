// Contient les informations sur l'Espace New Tec, le pôle d'innovation de la DIVTEC.
import type { KnowledgeChunk } from './index';

export const NEWTEC_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'newtec-mission',
    title: "Espace New Tec : Mission et Pôle d'Innovation",
    content: `- **Mission :** L'Espace New Tec est le pôle de **transfert de technologies** de la DIVTEC. Il fait le lien entre la formation et les PME industrielles en leur donnant accès à des technologies de pointe et une expertise pour leurs projets d'innovation.\n- **Lieu :** Porrentruy`,
    keywords: ['newtec', 'mission', 'innovation', 'transfert technologie', 'pme', 'porrentruy'],
  },
  {
    id: 'newtec-expertise-additive',
    title: 'Domaine d\'Expertise : Fabrication Additive (Impression 3D)',
    content: `- **Objectif :** Prototypage rapide, fabrication d'outillages et de pièces complexes sur mesure.\n- **Technologies :** Impression 3D **métal (SLM)** et **polymère (FDM, SLA)**.\n- **Applications :** Prototypes fonctionnels, outillages spécifiques, pièces pour l'horlogerie ou le medtech.`,
    keywords: ['fabrication additive', 'impression 3d', 'prototypage', 'slm', 'fdm', 'sla', 'métal', 'polymère'],
  },
  {
    id: 'newtec-expertise-vision',
    title: 'Domaine d\'Expertise : Vision Industrielle & IA',
    content: `- **Objectif :** Contrôle qualité à 100% sur les lignes de production.\n- **Technologies :** Caméras 2D/3D, Deep Learning, traitement d'image.\n- **Applications :** Contrôle qualité automatisé, guidage de robots (**Bin Picking**), lecture de marquages (OCR/OCV).`,
    keywords: ['vision industrielle', 'ia', 'intelligence artificielle', 'contrôle qualité', 'deep learning', 'bin picking'],
  },
  {
    id: 'newtec-expertise-robotique',
    title: 'Domaine d\'Expertise : Robotique et Automatisation',
    content: `- **Objectif :** Automatiser des tâches de précision et flexibiliser la production.\n- **Technologies :** Robots industriels 6 axes, **robots collaboratifs (cobots)**.\n- **Applications :** Assemblage de micro-composants, tâches "pick and place", automatisation de lignes.`,
    keywords: ['robotique', 'automatisation', 'cobots', 'robots collaboratifs', 'pick and place'],
  },
  {
    id: 'newtec-expertise-iiot',
    title: 'Domaine d\'Expertise : IIoT (Internet Industriel des Objets)',
    content: `- **Objectif :** Digitalisation des usines pour le suivi en temps réel et la maintenance prédictive.\n- **Technologies :** Capteurs, connectivité (LoRaWAN, 5G), plateformes cloud.\n- **Applications :** Maintenance prédictive, monitoring de production, optimisation logistique.`,
    keywords: ['iiot', 'internet industriel des objets', 'maintenance prédictive', 'capteurs', 'monitoring'],
  },
  {
    id: 'newtec-prestations',
    title: 'Prestations de New Tec pour les Entreprises',
    content: `New Tec collabore avec les entreprises pour accélérer leur transformation numérique via :\n- **Preuves de Concept (PoC) :** Validation de la faisabilité technique d'une innovation.\n- **Développement sur mesure :** Création de systèmes automatisés, cellules de contrôle, plateformes de monitoring.\n- **Formations sur mesure :** Ateliers pratiques sur les nouvelles technologies (robotique, impression 3D, etc.).\n- **Veille technologique :** Accompagnement stratégique pour identifier les technologies d'avenir.`,
    keywords: ['prestations', 'services', 'entreprises', 'poc', 'preuve de concept', 'développement sur mesure', 'formations'],
  },
  {
    id: 'newtec-projet-ged-qr-code',
    title: "Projet d'Apprentissage : GED-QR-CODE",
    content: `- **GED-QR-CODE :** Gestion documentaire liée aux machines. Comprend une application web pour gérer utilisateurs, rôles, machines et documents, et une application mobile pour scanner les QR codes et accéder à la documentation.`,
    keywords: ['ged-qr-code', 'gestion documentaire', 'qr code', 'application mobile', 'machines'],
  },
  {
    id: 'newtec-projet-app-logistique',
    title: "Projet d'Apprentissage : App-logistique",
    content: `- **App-logistique :** Gestion de stock multi-emplacements avec seuils d’alerte. L'accès est contrôlé par badge et un administrateur peut lancer des inventaires.`,
    keywords: ['app-logistique', 'gestion de stock', 'inventaire', 'badge', 'seuil alerte'],
  },
  {
    id: 'newtec-projet-maitre-sf',
    title: "Projet d'Apprentissage : Maitre_SF",
    content: `- **Maitre_SF :** Application centrale qui envoie des ordres aux machines pour exécuter des cycles de production et déposer les produits dans un distributeur.`,
    keywords: ['maitre_sf', 'ordres de fabrication', 'cycle de production', 'distributeur'],
  },
  {
    id: 'newtec-projet-flux-donnees',
    title: "Projet d'Apprentissage : Flux-de-donnees-dynamique",
    content: `- **Flux-de-donnees-dynamique :** Visualisation en temps réel des échanges de données entre les appareils de l'Industrie 4.0, avec un schéma global et des vues détaillées. Voici un exemple de visualisation du flux de données : [CHART:DATA_FLOW]`,
    keywords: ['flux-de-donnees-dynamique', 'visualisation', 'temps réel', 'recharts', 'industrie 4.0'],
  },
  {
    id: 'newtec-projet-usine-virtuelle',
    title: "Projet d'Apprentissage : Usine virtuelle",
    content: `- **Usine virtuelle :** Simulation numérique d'une usine Industrie 4.0 avec un cycle complet de fabrication.`,
    keywords: ['usine virtuelle', 'simulation numérique', 'jumeau numérique', 'fabrication'],
  },
  {
    id: 'newtec-projet-configurateur-produit',
    title: "Projet d'Apprentissage : Configurateur produit",
    content: `- **Configurateur produit :** Application web pour configurer un produit personnalisé et générer une commande de production.`,
    keywords: ['configurateur produit', 'personnalisation', 'commande', 'application web'],
  },
];
