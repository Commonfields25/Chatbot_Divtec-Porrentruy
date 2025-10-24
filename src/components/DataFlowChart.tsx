import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dataFlowData = [
    { time: '10:00', 'Appareil A': 400, 'Appareil B': 240, 'Appareil C': 150 },
    { time: '10:01', 'Appareil A': 380, 'Appareil B': 260, 'Appareil C': 180 },
    { time: '10:02', 'Appareil A': 350, 'Appareil B': 300, 'Appareil C': 220 },
    { time: '10:03', 'Appareil A': 300, 'Appareil B': 280, 'Appareil C': 250 },
    { time: '10:04', 'Appareil A': 270, 'Appareil B': 310, 'Appareil C': 230 },
    { time: '10:05', 'Appareil A': 300, 'Appareil B': 139, 'Appareil C': 280 },
    { time: '10:06', 'Appareil A': 250, 'Appareil B': 180, 'Appareil C': 310 },
    { time: '10:07', 'Appareil A': 220, 'Appareil B': 220, 'Appareil C': 350 },
    { time: '10:08', 'Appareil A': 240, 'Appareil B': 250, 'Appareil C': 330 },
    { time: '10:09', 'Appareil A': 210, 'Appareil B': 450, 'Appareil C': 300 },
    { time: '10:10', 'Appareil A': 200, 'Appareil B': 980, 'Appareil C': 280 },
    { time: '10:11', 'Appareil A': 215, 'Appareil B': 850, 'Appareil C': 260 },
    { time: '10:12', 'Appareil A': 230, 'Appareil B': 700, 'Appareil C': 290 },
    { time: '10:13', 'Appareil A': 255, 'Appareil B': 550, 'Appareil C': 320 },
    { time: '10:14', 'Appareil A': 268, 'Appareil B': 450, 'Appareil C': 350 },
    { time: '10:15', 'Appareil A': 278, 'Appareil B': 390, 'Appareil C': 380 },
    { time: '10:16', 'Appareil A': 260, 'Appareil B': 410, 'Appareil C': 400 },
    { time: '10:17', 'Appareil A': 245, 'Appareil B': 430, 'Appareil C': 420 },
    { time: '10:18', 'Appareil A': 220, 'Appareil B': 450, 'Appareil C': 410 },
    { time: '10:19', 'Appareil A': 199, 'Appareil B': 470, 'Appareil C': 390 },
    { time: '10:20', 'Appareil A': 189, 'Appareil B': 480, 'Appareil C': 380 },
];

const DataFlowChart = () => (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataFlowData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Appareil A" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Appareil B" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Appareil C" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default DataFlowChart;
