import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule], // Ensure CommonModule is imported for ngIf, ngFor, etc.
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any; // This will hold the fetched event

  constructor(
    private route: ActivatedRoute, // To access route parameters
    private router: Router, // To navigate programmatically
    private eventService: EventService // To fetch event data
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.event = this.eventService.getEventById(eventId);
    }
  }

  backToEvents() {
    console.log('Navigating back to events list');
    // Navigate back to the events list
    this.router.navigate(['/events/list']);
  }
}
