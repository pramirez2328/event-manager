import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    EventListComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showCalendar: boolean = false;
  searchQuery: string = '';
  foundEvents: Array<{
    id: string;
    title: string;
    date: string;
    recipients: Array<{ name: string; email: string }>;
    location: string;
    description: string;
  }> = [];

  constructor(private router: Router, private searchService: SearchService) {}

  toggleView() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.router.navigate(['/events/calendar']);
    } else {
      this.router.navigate(['/events/list']);
    }
  }

  // Handle the search query from the header
  onSearch(query: string) {
    this.searchQuery = query;
    this.foundEvents = this.searchService.searchEventByTitle(query); // Search for the event
  }
}
