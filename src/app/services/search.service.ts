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
    const foundEvent = events.find(
      (event: any) => event.title.toLowerCase() === title.toLowerCase()
    );

    if (foundEvent) {
      console.log('Event found:', foundEvent);
    } else {
      console.log('No event found with the title:', title);
    }

    return foundEvent;
  }
}
