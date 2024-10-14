import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

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
  isDarkMode: boolean = true; // Manage the light/dark mode state
  showCalendar: boolean = false;

  foundEvents: Array<{
    id: string;
    title: string;
    date: string;
    recipients: Array<{ name: string; email: string }>;
    location: string;
    description: string;
  }> = [];

  constructor(private router: Router) {}

  toggleView() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.router.navigate(['/events/calendar']);
    } else {
      this.router.navigate(['/events/list']);
    }
  }

  // Method to toggle between Light and Dark modes
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const mainContainer =
      document.querySelector<HTMLElement>('.main-container');
    if (mainContainer) {
      if (this.isDarkMode) {
        mainContainer.classList.add('dark-mode');
      } else {
        mainContainer.classList.remove('dark-mode');
      }
    }
  }
}
