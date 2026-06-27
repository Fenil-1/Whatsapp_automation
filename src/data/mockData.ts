// src/data/mockData.ts

export interface Contact {
  id: string;
  name: string;
  phone: string;
  city: string;
  status: 'Active' | 'Inactive' | 'Opted Out' | 'Blocked';
  lastSeen: string;
  engagementScore: number;
  groups: string[];
  tags: string[];
}

export interface Group {
  id: string;
  name: string;
  count: number;
  lastUsed: string;
  tags: string[];
  color: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Completed' | 'Sending' | 'Scheduled' | 'Paused';
  sentCount: number;
  delivered: number;
  read: number;
  failed: number;
  timestamp: string;
  groupNames: string[];
}

const INDIAN_NAMES = [
  'Aravind Sharma', 'Priya Patel', 'Rahul Mishra', 'Sneha Reddy', 'Amit Verma',
  'Deepak Gupta', 'Neha Nair', 'Rohan Joshi', 'Ananya Rao', 'Vikram Singh',
  'Siddharth Malhotra', 'Kriti Desai', 'Manish Kumar', 'Tanvi Shah', 'Aditya Bose'
];

const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];
const GROUP_TEMPLATES = [
  { name: 'Fabric Suppliers', color: 'from-blue-500 to-indigo-600', tags: ['B2B', 'Vendor'] },
  { name: 'Kurti Suppliers', color: 'from-purple-500 to-pink-600', tags: ['B2B', 'Apparel'] },
  { name: 'Unstitched Suppliers', color: 'from-emerald-500 to-teal-600', tags: ['Raw Material'] },
  { name: 'Retail Customers', color: 'from-orange-500 to-amber-600', tags: ['B2C', 'Active'] },
  { name: 'VIP Customers', color: 'from-yellow-500 to-amber-500', tags: ['High-Value'] },
  { name: 'Tamil Nadu Customers', color: 'from-red-500 to-rose-600', tags: ['Regional'] },
  { name: 'Bihar Customers', color: 'from-cyan-500 to-blue-600', tags: ['Regional'] },
  { name: 'Delhi Customers', color: 'from-violet-500 to-purple-600', tags: ['Regional'] },
  { name: 'Ahmedabad Customers', color: 'from-fuchsia-500 to-pink-600', tags: ['Local'] },
  { name: 'Wholesale Buyers', color: 'from-lime-500 to-green-600', tags: ['Bulk'] }
];

export const generateMockData = () => {
  const groups: Group[] = GROUP_TEMPLATES.map((gt, i) => ({
    id: `g-${i}`,
    name: gt.name,
    count: Math.floor(Math.random() * 1200) + 300,
    lastUsed: `${Math.floor(Math.random() * 10) + 1} days ago`,
    tags: gt.tags,
    color: gt.color
  }));

  const campaigns: Campaign[] = [
    { id: 'c-1', name: 'Festive Diwali Blast - Wholesale', status: 'Completed', sentCount: 12450, delivered: 12100, read: 9840, failed: 110, timestamp: '2026-06-25 10:30 AM', groupNames: ['Wholesale Buyers', 'Ahmedabad Customers'] },
    { id: 'c-2', name: 'EID Special Catalogue Launch', status: 'Completed', sentCount: 8900, delivered: 8750, read: 7200, failed: 45, timestamp: '2026-06-20 02:15 PM', groupNames: ['VIP Customers', 'Retail Customers'] },
    { id: 'c-3', name: 'Monsoon Stock clearance Warning', status: 'Sending', sentCount: 4500, delivered: 3100, read: 1400, failed: 12, timestamp: 'Running Now', groupNames: ['Fabric Suppliers', 'Delhi Customers'] },
    { id: 'c-4', name: 'Automated Payment Reminder Grid', status: 'Scheduled', sentCount: 1450, delivered: 0, read: 0, failed: 0, timestamp: '2026-06-29 09:00 AM', groupNames: ['Unstitched Suppliers'] }
  ];

  for (let i = 5; i <= 15; i++) {
    campaigns.push({
      id: `c-${i}`,
      name: `Automated Broadcast Campaign #${100 + i}`,
      status: Math.random() > 0.4 ? 'Completed' : 'Scheduled',
      sentCount: Math.floor(Math.random() * 5000) + 1000,
      delivered: Math.floor(Math.random() * 4000),
      read: Math.floor(Math.random() * 3000),
      failed: Math.floor(Math.random() * 50),
      timestamp: `2026-06-${10 + (i % 10)} 11:00 AM`,
      groupNames: [groups[i % groups.length].name]
    });
  }

  const contacts: Contact[] = Array.from({ length: 120 }).map((_, i) => {
    const name = INDIAN_NAMES[i % INDIAN_NAMES.length] + ' ' + String.fromCharCode(65 + (i % 26));
    const randomCity = CITIES[i % CITIES.length];
    const assignedGroups = [groups[i % groups.length].name, groups[(i + 3) % groups.length].name];
    const statusOptions: Contact['status'][] = ['Active', 'Active', 'Active', 'Inactive', 'Opted Out', 'Blocked'];
    
    return {
      id: `usr-${1000 + i}`,
      name,
      phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      city: randomCity,
      status: statusOptions[i % statusOptions.length],
      lastSeen: `${Math.floor(Math.random() * 23) + 1}h ago`,
      engagementScore: Math.floor(Math.random() * 45) + 55,
      groups: assignedGroups,
      tags: [randomCity, i % 2 === 0 ? 'High-Value' : 'Tier-2']
    };
  });

  return { groups, campaigns, contacts };
};
