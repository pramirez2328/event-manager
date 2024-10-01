import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service'; // Import the EventService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  selectedDate: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService // Inject the EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      numberOfPeople: [1, Validators.required],
      emails: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Inject the clicked date into the form
    this.route.queryParams.subscribe((params) => {
      if (params['date']) {
        this.selectedDate = params['date'];
        this.eventForm.patchValue({ date: this.selectedDate });
      }
    });
  }

  // Submit the form data
  onSubmit(): void {
    if (this.eventForm.valid) {
      // Add the event to the EventService
      const newEvent = {
        title: this.eventForm.value.title,
        date: this.eventForm.value.date,
      };
      this.eventService.addEvent(newEvent);

      // Navigate back to the calendar
      this.router.navigate(['/events/calendar']);
    }
  }
}
