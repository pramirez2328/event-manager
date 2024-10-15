import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySource = new BehaviorSubject<string>('');
  currentSearchQuery = this.searchQuerySource.asObservable();

  // Method to update the search query
  updateSearchQuery(query: string) {
    this.searchQuerySource.next(query);
  }

  // Method to search for events by title
  searchEventByTitle(title: string): any {
    const events = JSON.parse(localStorage.getItem('EXISTING_EVENTS') || '[]');

    if (title.length < 3) {
      console.log('Please enter at least 3 characters.');
      return [];
    }

    const foundEvents = events.filter((event: any) =>
      event.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundEvents.length > 0) {
      console.log('Matching events found:', foundEvents);
    } else {
      console.log('No events found containing the title:', title);
    }

    return foundEvents;
  }
}
