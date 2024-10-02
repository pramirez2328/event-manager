import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchQuery: string = '';

  @Output() searchEvent = new EventEmitter<string>(); // Emit search query to parent

  onSearch() {
    this.searchEvent.emit(this.searchQuery); // Emit the search query to the parent
  }
}
