import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent }, // Add this to handle `/events`
  {
    path: 'events/list',
    component: EventListComponent,
  },
  { path: 'events/list/form', component: EventFormComponent },
  { path: 'events/list/:id', component: EventDetailsComponent },
  { path: 'events/calendar', component: CalendarComponent },
  { path: 'events/calendar/form', component: EventFormComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
