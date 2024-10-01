import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../services/event.service'; // Inject EventService
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { events } from '../../../util/events'; // Import the events data

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [FullCalendarModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarComponent implements OnInit {
  selectedDate: string = '';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    events: [], // Initialize with an empty array
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents(); // Load the events initially
  }

  // Method to load events from the EventService and update the calendar
  loadEvents(): void {
    const existingEvents = events.map((event) => ({
      title: event.title,
      date: event.date, // FullCalendar requires ISO8601 date strings (e.g., 'YYYY-MM-DD')
    }));

    // Merge events from the service, which includes any newly added ones
    const allEvents = [...existingEvents, ...this.eventService.getEvents()];

    // Update the calendarOptions with all events
    this.calendarOptions.events = allEvents;
  }

  // Method to handle date clicks
  handleDateClick(arg: any): void {
    this.router.navigate(['/events/form'], {
      queryParams: { date: arg.dateStr },
    });
  }
}
