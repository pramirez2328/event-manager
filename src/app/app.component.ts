import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchService } from '../app/services/share.service'; // Import SearchService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showCalendar: boolean = false;

  constructor(private router: Router, private searchService: SearchService) {}

  // Toggle between calendar and event list view
  toggleView() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.router.navigate(['/events/calendar']);
    } else {
      this.router.navigate(['/events/list']);
    }
  }

  // Add this method to handle the search query from the header
  onSearch(query: string) {
    this.searchService.updateSearchQuery(query); // Update the search query in the service
  }
}
