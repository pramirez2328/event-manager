import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySource = new BehaviorSubject<string>('');
  currentSearchQuery = this.searchQuerySource.asObservable();

  updateSearchQuery(query: string) {
    console.log('Search query:', query);
    this.searchQuerySource.next(query);
  }

  searchEventByTitle(title: string): any {
    const events = JSON.parse(localStorage.getItem('events') || '[]');

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
