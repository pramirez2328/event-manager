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
  @Input() isDarkMode: boolean = true; // Input from the AppComponent
  @Input() showCalendar: boolean = true; // Input from the AppComponent

  @Output() toggleTheme = new EventEmitter<void>(); // Emit event to AppComponent
  @Output() toggleView = new EventEmitter<void>(); // Emit event to AppComponent
}
