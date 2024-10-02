import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  imports: [CommonModule],
})
export class EventListComponent implements OnInit {
  events: Array<{
    id: string;
    title: string;
    date: string;
    numberOfPeople: number;
    emails: string;
    location: string;
    description: string;
  }> = [];

  collapsedStates: { [key: string]: boolean } = {}; // Track collapse state for each event

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = this.eventService.getEvents();
    this.events.forEach((event) => (this.collapsedStates[event.id] = true)); // Initialize collapse states
  }

  toggleCollapse(eventId: string): void {
    this.collapsedStates[eventId] = !this.collapsedStates[eventId];
  }
}
