import { Injectable } from '@angular/core';
import { events as preloadedEvents } from '../../../src/util/events'; // Static events

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsKey = 'events';

  constructor() {
    this.loadEventsFromStorage(); // Load events from localStorage when service is initialized
  }

  private events: Array<{
    id: string;
    title: string;
    date: string;
    numberOfPeople: number;
    emails: string;
    location: string;
    description: string;
  }> = [];

  // Load events from localStorage
  private loadEventsFromStorage(): void {
    const savedEvents = localStorage.getItem(this.eventsKey);
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    } else {
      // Save the static events to localStorage if it's the first app load
      this.events = preloadedEvents;
      this.saveEventsToStorage();
    }
  }

  // Save the events to localStorage
  private saveEventsToStorage(): void {
    localStorage.setItem(this.eventsKey, JSON.stringify(this.events));
  }

  getEventById(id: string | null) {
    return this.events.find((event) => event.id === id);
  }

  // Get all events
  getEvents() {
    return this.events;
  }

  // Add a new event and save it to localStorage
  addEvent(event: {
    title: string;
    date: string;
    numberOfPeople: number;
    emails: string;
    location: string;
    description: string;
  }) {
    const newEvent = {
      id: this.generateUniqueId(),
      ...event,
    };
    this.events.push(newEvent);
    this.saveEventsToStorage(); // Save updated events to localStorage
  }

  // Update an existing event by ID and save it to localStorage
  updateEvent(
    id: string,
    updatedEvent: {
      title: string;
      date: string;
      numberOfPeople: number;
      emails: string;
      location: string;
      description: string;
    }
  ) {
    const eventIndex = this.events.findIndex((event) => event.id === id);
    if (eventIndex !== -1) {
      this.events[eventIndex] = { ...this.events[eventIndex], ...updatedEvent };
      this.saveEventsToStorage(); // Save updated events to localStorage
    }
  }

  // Generate a unique ID for events
  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
