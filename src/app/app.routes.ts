import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' }, // Redirect to /events
  { path: 'events', component: EventListComponent }, // Display the list of events
  { path: 'events/list', component: EventListComponent }, // Display the list of events
  { path: 'events/list/form', component: EventFormComponent }, // Display the form to add a new event
  { path: 'events/list/:id', component: EventDetailsComponent }, // Display the details of a specific event
  { path: 'events/calendar', component: CalendarComponent }, // Display the calendar view
  { path: 'events/calendar/form', component: EventFormComponent }, // Display the form to add a new event
  { path: '**', component: NotFoundComponent }, // Display the 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
