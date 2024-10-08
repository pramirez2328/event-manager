import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showCalendar: boolean = false;
  foundEvent: any; // To store the found event

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
    this.searchService.updateSearchQuery(query);
    this.foundEvent = this.searchService.searchEventByTitle(query); // Search for the event
  }
}
