'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const promoOptions = [
  { name: 'Promo A', product: 'Vape Pen', vendor: 'BudCo', priority: 95 },
  { name: 'Promo B', product: 'Pre-Roll', vendor: 'GreenLeaf', priority: 87 },
  { name: 'Promo C', product: 'Gummies', vendor: 'HighFly', priority: 78 }
];

const salesData = {
  'Promo A': [
    { date: 'Mar', sales: 5000, forecast: 4800 },
    { date: 'Apr', sales: 6200, forecast: 6000 },
    { date: 'May', sales: 7100, forecast: 7200 },
  ],
  'Promo B': [
    { date: 'Mar', sales: 4000, forecast: 4300 },
    { date: 'Apr', sales: 4500, forecast: 4600 },
    { date: 'May', sales: 4800, forecast: 5000 },
  ],
  'Promo C': [
    { date: 'Mar', sales: 3000, forecast: 2900 },
    { date: 'Apr', sales: 3500, forecast: 3700 },
    { date: 'May', sales: 3900, forecast: 4000 },
  ]
};

const inventoryData = {
  'Promo A': [{ product: 'Vape Pen', inventory: 150, forecast: 130 }],
  'Promo B': [{ product: 'Pre-Roll', inventory: 120, forecast: 140 }],
  'Promo C': [{ product: 'Gummies', inventory: 90, forecast: 85 }]
};

const promoStatusData = [
  { name: 'Confirmed', value: 45 },
  { name: 'Missed', value: 10 },
  { name: 'Live', value: 30 },
  { name: 'Pending', value: 15 },
];

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

export default function PromoDashboard() {
  const [selectedPromo, setSelectedPromo] = useState('Promo A');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Promo Execution Status</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={promoStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              label
            >
              {promoStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Top Ranked Promos by Priority</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={promoOptions} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="priority" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Sales vs Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData[selectedPromo]}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Actual Sales" />
            <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecast" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Inventory vs Forecasted Demand</h2>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-right">Inventory</th>
              <th className="text-right">Forecasted Demand</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData[selectedPromo].map((item, idx) => (
              <tr key={idx}>
                <td>{item.product}</td>
                <td className="text-right">{item.inventory}</td>
                <td className="text-right">{item.forecast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
