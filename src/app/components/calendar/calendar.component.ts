import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../services/event.service';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/darkMode.service';

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
  isDarkMode: boolean = false;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    events: [], // Initialize with an empty array
    dateClick: this.handleDateClick.bind(this), // Add dateClick handler
    eventClick: this.handleEventClick.bind(this), // Add eventClick handler
  };

  constructor(
    private router: Router,
    private eventService: EventService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  // Method to load events from the EventService and update the calendar
  loadEvents(): void {
    const allEvents = this.eventService.getEvents(); // Fetch events from the service

    // Map the event data to FullCalendar's format
    const mappedEvents = allEvents.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
    }));

    // Update calendarOptions with new events
    this.calendarOptions = {
      ...this.calendarOptions, // Keep existing options
      events: mappedEvents, // Update events array
    };
  }

  // Method to handle date clicks (create a new event)
  handleDateClick(arg: any): void {
    this.router.navigate(['/events/calendar/form'], {
      queryParams: { date: arg.dateStr },
    });
  }

  // Method to handle event clicks (edit an existing event)
  handleEventClick(info: any): void {
    const eventId = info.event.id;

    // Pass the event details as query parameters to the form for editing
    this.router.navigate(['/events/calendar/form'], {
      queryParams: { id: eventId },
    });
  }
}
