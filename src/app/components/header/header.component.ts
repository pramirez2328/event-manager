import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showCalendar: boolean = false;
  constructor(private router: Router) {}

  toggleView() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.router.navigate(['/events/calendar']);
    } else {
      this.router.navigate(['/events/list']);
    }
  }
}
