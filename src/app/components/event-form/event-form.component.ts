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
  isEditMode: boolean = false;
  eventId: string | null = null;

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
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        // Editing an existing event
        this.isEditMode = true;
        this.eventId = params['id'];

        // Load the existing event data
        const existingEvent = this.eventService.getEventById(this.eventId);
        if (existingEvent) {
          this.eventForm.patchValue({
            title: existingEvent.title,
            numberOfPeople: existingEvent.numberOfPeople,
            emails: existingEvent.emails,
            location: existingEvent.location,
            description: existingEvent.description,
            date: existingEvent.date,
          });
        }
      } else if (params['date']) {
        // Creating a new event with the selected date
        this.selectedDate = params['date'];
        this.eventForm.patchValue({ date: this.selectedDate });
      }
    });
  }

  // Submit the form data
  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;

      if (this.isEditMode && this.eventId) {
        // Update existing event
        this.eventService.updateEvent(this.eventId, formData);
      } else {
        // Add a new event
        const newEvent = {
          ...formData,
        };
        this.eventService.addEvent(newEvent);
      }

      // Navigate back to the calendar
      this.router.navigate(['/events/calendar']);
    }
  }
}
