import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule, // Add RouterModule to access routing features
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showCalendar: boolean = true;

  constructor(private router: Router) {} // Inject Router service

  toggleView() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.router.navigate(['/events/calendar']); // Navigate to calendar route
    } else {
      this.router.navigate(['/events/list']); // Navigate to event list route
    }
  }
}
