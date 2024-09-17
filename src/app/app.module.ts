import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    EventListComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    AppComponent,
  ],
  providers: [],
})
export class AppModule {}
