import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    EventListComponent,
    EventCalendarComponent,
  ], // Import all used components here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
