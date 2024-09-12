import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Ensure you export your routes from app.routes

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provide the routes directly using provideRouter
  ],
}).catch((err) => console.error(err));
