import { Injectable } from '@angular/core';
import { EVENTS as preloadedEvents } from '../../../src/util/events'; // Import preloaded events

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsKey = 'EXISTING_EVENTS';

  constructor() {
    this.loadEventsFromStorage(); // Load events from localStorage when service is initialized
  }

  private events: Array<{
    id: string;
    title: string;
    date: string;
    recipients: Array<{ name: string; email: string }>;
    location: string;
    description: string;
  }> = [];

  // Load events from localStorage
  private loadEventsFromStorage(): void {
    const savedEvents = localStorage.getItem(this.eventsKey);
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    } else {
      this.events = preloadedEvents;
      this.saveEventsToStorage();
    }
  }

  // Save the events to localStorage
  private saveEventsToStorage(): void {
    localStorage.setItem(this.eventsKey, JSON.stringify(this.events));
  }

  // Get an event by ID
  getEventById(id: string | null) {
    if (!id) {
      return null;
    }

    const event = this.events.find((event) => event.id === id);
    return event;
  }

  // Get all events
  getEvents(): Array<any> {
    const savedEvents = localStorage.getItem(this.eventsKey);
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
      return this.events;
    }
    return [];
  }

  // Add a new event and save it to localStorage
  addEvent(event: {
    title: string;
    date: string;
    recipients: Array<{ name: string; email: string }>;
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
      recipients: Array<{ name: string; email: string }>;
      location: string;
      description: string;
    }
  ) {
    const eventIndex = this.events.findIndex((event) => event.id === id);
    if (eventIndex !== -1) {
      const existingRecipints = this.events[eventIndex].recipients;
      this.events[eventIndex] = {
        ...this.events[eventIndex],
        ...updatedEvent,
        recipients: existingRecipints,
      };

      this.saveEventsToStorage(); // Save updated events to localStorage
    }
  }

  // Save updated event list to localStorage
  saveEvents(events: Array<any>): void {
    localStorage.setItem(this.eventsKey, JSON.stringify(events));
  }

  // Delete an event from localStorage and the local array
  deleteEventById(eventId: string): void {
    const events = this.getEvents(); // Fetch current events
    const updatedEvents = events.filter((event) => event.id !== eventId); // Remove the event by id

    // Save the updated list back to localStorage
    this.saveEvents(updatedEvents);
  }

  // Generate a unique ID for events
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
