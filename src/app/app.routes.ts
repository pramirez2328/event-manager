import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventFormComponent } from './components/event-form/event-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events/list', pathMatch: 'full' },
  { path: 'events/list', component: EventListComponent },
  { path: 'events/calendar', component: CalendarComponent },
  { path: 'events/form', component: EventFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
