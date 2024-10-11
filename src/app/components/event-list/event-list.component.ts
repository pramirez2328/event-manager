import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EventService } from '../../services/event.service';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EventListComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = ''; // Search term passed from parent
  events: Array<{
    id: string;
    title: string;
    date: string;
    recipients: Array<{ name: string; email: string }>;
    location: string;
    description: string;
  }> = [];

  isSearchActive: boolean = false; // Flag to indicate search activity
  collapsedStates: { [key: string]: boolean } = {}; // Track collapse state for each event

  constructor(
    private eventService: EventService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // if (!this.searchTerm || this.searchTerm.trim() === '') {
    //   this.loadEvents(); // Load events only if no search term exists
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if searchTerm has changed and if it should trigger search or clear
    if (changes['searchTerm']) {
      if (this.searchTerm && this.searchTerm.trim().length >= 3) {
        this.searchEvents(); // Trigger search if term is 3 or more characters
      } else if (this.searchTerm.trim() === '') {
        this.clearSearch(); // Clear the search and load all events
      }
    }
  }

  loadEvents(): void {
    this.events = this.eventService.getEvents();
    this.events.forEach((event) => (this.collapsedStates[event.id] = true)); // Initialize collapse states
  }

  searchEvents(): void {
    this.events = this.searchService.searchEventByTitle(this.searchTerm);
    console.log('Search events:', this.events);
    if (this.events.length > 0) {
      this.isSearchActive = true; // Set search active
    }
  }

  clearSearch(): void {
    this.loadEvents(); // Reload all events
    this.isSearchActive = false; // Reset search active flag
  }

  toggleCollapse(eventId: string): void {
    this.collapsedStates[eventId] = !this.collapsedStates[eventId];
  }
}
