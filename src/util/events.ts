import { generateUniqueId } from './generateUniqueId';

export const events = [
  {
    id: generateUniqueId(),
    date: '2024-09-09',
    title: 'Company Picnic',
    numberOfPeople: 2,
    emails: 'john.doe@example.com, jane.smith@example.com', // Extracted emails
    location: 'Millennium Park, Chicago, IL',
    description: 'A fun day outdoors with food and games.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-10',
    title: 'Team Meeting',
    numberOfPeople: 2,
    emails: 'alice.johnson@example.com, bob.brown@example.com', // Extracted emails
    location: '875 N Michigan Ave, Chicago, IL',
    description: 'Quarterly team strategy meeting.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-13',
    title: 'Product Launch',
    numberOfPeople: 2,
    emails: 'charlie.davis@example.com, dana.lee@example.com', // Extracted emails
    location: '233 S Wacker Dr, Chicago, IL',
    description: 'Launch event for the new product line.',
  },
  {
    id: generateUniqueId(),
    date: '2024-09-15',
    title: 'Sales Workshop',
    numberOfPeople: 2,
    emails: 'eve.harris@example.com, frank.wilson@example.com', // Extracted emails
    location: '360 N State St, Chicago, IL',
    description: 'Workshop focused on improving sales skills.',
  },
];
