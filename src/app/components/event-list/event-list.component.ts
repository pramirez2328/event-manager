import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { EventService } from '../../services/event.service';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  numberOfEvents: number = 0;

  constructor(
    private eventService: EventService,
    private searchService: SearchService,
    private router: Router, // Inject Router to navigate programmatically
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadEvents(); // Load events on initialization
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
      if (this.searchTerm && this.searchTerm.trim().length >= 3) {
        this.searchEvents(); // Trigger the search immediately if query param exists
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.handleSearchTerm();
    }
  }

  handleSearchTerm(): void {
    if (this.searchTerm && this.searchTerm.trim().length >= 3) {
      this.searchEvents(); // Trigger search if the term is 3 or more characters
    } else if (this.searchTerm.trim() === '') {
      this.clearSearch(); // Clear the search and load all events
    }
  }

  loadEvents(): void {
    this.events = this.eventService.getEvents();
    this.numberOfEvents = this.events.length;
  }

  searchEvents(): void {
    this.events = this.searchService.searchEventByTitle(this.searchTerm);
    this.isSearchActive = this.events.length > 0;
  }

  deleteEvent(eventId: string): void {
    this.eventService.deleteEventById(eventId);
    this.events = this.events.filter((event) => event.id !== eventId);
    this.numberOfEvents = this.events.length;
  }

  updateEvent(eventId: string): void {
    this.router.navigate(['/events/form'], { queryParams: { id: eventId } });
  }

  clearSearch(): void {
    this.loadEvents(); // Reload all events
    this.searchTerm = ''; // Reset the search term
    this.isSearchActive = false; // Reset search active flag
  }

  viewDetails(eventId: string): void {
    this.router.navigate(['/events/list/', eventId]);
  }

  // Add the missing onSearchChange method
  onSearchChange(): void {
    this.handleSearchTerm(); // Trigger search logic whenever the search term changes
  }
}
