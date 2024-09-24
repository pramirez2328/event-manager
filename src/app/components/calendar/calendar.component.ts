import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin
import { EventFormComponent } from '../event-form/event-form.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives
import { events } from '../../../util/events';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [
    FullCalendarModule,
    EventFormComponent,
    CommonModule, // Import CommonModule for ngIf and other directives
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin], // Add interactionPlugin here
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    events: [],
    dateClick: this.handleDateClick.bind(this), // This will now work with interactionPlugin
  };

  selectedDate: string = ''; // Store the clicked date

  constructor() {}

  ngOnInit(): void {
    // Map your custom events to FullCalendar's event format
    this.calendarOptions.events = events.map((event) => ({
      title: event.title,
      date: event.date, // Use the date directly from the event object
    }));
  }

  // Method to handle date clicks
  handleDateClick(arg: any): void {
    this.selectedDate = arg.dateStr; // Set the clicked date
    console.log('Selected Date: ', this.selectedDate);
  }
}
