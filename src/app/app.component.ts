import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    EventListComponent,
    EventDetailsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  foundEvents: Array<{
    id: string;
    title: string;
    date: string;
    recipients: Array<{ name: string; email: string }>;
    location: string;
    description: string;
  }> = [];

  constructor() {}
}
