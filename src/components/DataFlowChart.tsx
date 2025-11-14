/**
 * @fileoverview Composant React pour afficher un graphique de flux de données.
 *
 * Ce composant utilise la bibliothèque `recharts` pour générer une visualisation
 * sous forme de graphique en aires (AreaChart). Il est conçu pour afficher une série
 * de points de données représentant un flux au fil du temps.
 *
 * @component
 */

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Les données sont actuellement statiques (hardcodées) à des fins de démonstration.
const data = [
    { name: 'Étape 1', value: 200 },
    { name: 'Étape 2', value: 350 },
    { name: 'Étape 3', value: 300 },
    { name: 'Étape 4', value: 450 },
    { name: 'Étape 5', value: 400 },
    { name: 'Étape 6', value: 550 },
    { name: 'Étape 7', value: 600 },
];

/**
 * Le composant `DataFlowChart`.
 * @returns {React.ReactElement} Un conteneur responsive avec le graphique.
 */
const DataFlowChart: React.FC = () => {
    return (
        <div style={{ width: '100%', height: 300, userSelect: 'none' }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        {/* Définit un dégradé de couleur pour le remplissage du graphique */}
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                        labelStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataFlowChart;
