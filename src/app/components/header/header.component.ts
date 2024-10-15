import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isDarkMode: boolean = true;
  @Input() showCalendar: boolean = true;

  // Event emitters to toggle between Light and Dark modes and Calendar and List views
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleView = new EventEmitter<void>();
}
