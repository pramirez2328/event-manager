import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment'; // Import environment for API key

// Function to dynamically load the Google Maps API script
function loadGoogleMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&libraries=places&v=beta`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(); // Resolve promise when script loads successfully
    script.onerror = () => reject('Error loading Google Maps API script'); // Reject on error
    document.head.appendChild(script);
  });
}

// Load Google Maps API script before bootstrapping the Angular app
loadGoogleMapsApi()
  .then(() => {
    bootstrapApplication(AppComponent, {
      providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule),
        importProvidersFrom(FullCalendarModule),
        provideHttpClient(),
      ],
    }).catch((err) => console.error(err));
  })
  .catch((err) => {
    console.error('Failed to load Google Maps API:', err);
  });
