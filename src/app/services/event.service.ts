// event.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Array<{ title: string; date: string }> = [];

  getEvents() {
    return this.events;
  }

  addEvent(event: { title: string; date: string }) {
    this.events.push(event);
  }
}
