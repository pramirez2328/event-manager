import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    EventListComponent,
    CalendarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
