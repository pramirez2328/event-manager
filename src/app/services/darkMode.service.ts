// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false); // Default value can be true or false
  isDarkMode$ = this.darkModeSubject.asObservable();

  setDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);
  }
}
