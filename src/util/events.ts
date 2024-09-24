import { generateUniqueId } from './generateUniqueId';

export const events = [
  {
    id: generateUniqueId(),
    date: '2024-09-09',
    title: 'Company Picnic',
    people: [
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Jane Smith', email: 'jane.smith@example.com' },
    ],
    location: 'Millennium Park, Chicago, IL',
    description: 'A fun day outdoors with food and games.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-10',
    title: 'Team Meeting',
    people: [
      { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
      { name: 'Bob Brown', email: 'bob.brown@example.com' },
    ],
    location: '875 N Michigan Ave, Chicago, IL',
    description: 'Quarterly team strategy meeting.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-13',
    title: 'Product Launch',
    people: [
      { name: 'Charlie Davis', email: 'charlie.davis@example.com' },
      { name: 'Dana Lee', email: 'dana.lee@example.com' },
    ],
    location: '233 S Wacker Dr, Chicago, IL',
    description: 'Launch event for the new product line.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-15',
    title: 'Sales Workshop',
    people: [
      { name: 'Eve Harris', email: 'eve.harris@example.com' },
      { name: 'Frank Wilson', email: 'frank.wilson@example.com' },
    ],
    location: '360 N State St, Chicago, IL',
    description: 'Workshop focused on improving sales skills.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-15',
    title: 'Charity Gala',
    people: [
      { name: 'Grace Turner', email: 'grace.turner@example.com' },
      { name: 'Henry Clark', email: 'henry.clark@example.com' },
    ],
    location: '100 E Erie St, Chicago, IL',
    description: 'Annual gala to raise funds for charity.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-20',
    title: 'Hackathon',
    people: [
      { name: 'Isabella Moore', email: 'isabella.moore@example.com' },
      { name: 'Jake White', email: 'jake.white@example.com' },
    ],
    location: '111 W Adams St, Chicago, IL',
    description: '48-hour coding competition.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-23',
    title: 'Networking Event',
    people: [
      { name: 'Karen Scott', email: 'karen.scott@example.com' },
      { name: 'Leo Wright', email: 'leo.wright@example.com' },
    ],
    location: '401 N Michigan Ave, Chicago, IL',
    description: 'Connect with professionals across industries.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-25',
    title: 'Art Exhibition',
    people: [
      { name: 'Mia Evans', email: 'mia.evans@example.com' },
      { name: 'Noah Baker', email: 'noah.baker@example.com' },
    ],
    location: 'The Art Institute of Chicago, Chicago, IL',
    description: "Showcasing local artists' works.",
  },
  {
    id: generateUniqueId(),
    date: '2024-09-27',
    title: 'Tech Conference',
    people: [
      { name: 'Olivia Adams', email: 'olivia.adams@example.com' },
      { name: 'Peter Parker', email: 'peter.parker@example.com' },
    ],
    location: 'McCormick Place, Chicago, IL',
    description: 'Annual conference for tech enthusiasts.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-30',
    title: 'Cooking Class',
    people: [
      { name: 'Quincy James', email: 'quincy.james@example.com' },
      { name: 'Rachel Green', email: 'rachel.green@example.com' },
    ],
    location: 'Lincoln Park, Chicago, IL',
    description: 'Learn to cook gourmet dishes with a chef.',
  },
];
