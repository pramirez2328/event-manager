import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for structural directives
import { EventService } from '../../services/event.service';
import { generateUniqueId } from '../../../util/generateUniqueId';
import * as emailjs from '@emailjs/browser';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Make sure ReactiveFormsModule and CommonModule are imported here
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  isEditMode: boolean = false;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required], // Event title
      location: ['', Validators.required], // Event location
      description: ['', Validators.required], // Event description
      recipients: this.fb.array([]), // Form array for multiple recipients
    });
  }

  ngOnInit(): void {
    emailjs.init('pr1UJGTPULYPKkq54'); // Initialize EmailJS with your public key

    // Add initial recipient
    this.addRecipient();

    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.eventId = params['id'];
        const existingEvent = this.eventService.getEventById(this.eventId);
        if (existingEvent) {
          this.eventForm.patchValue(existingEvent);
        }
      }
    });
  }

  // Getter for recipients form array
  get recipients(): FormArray {
    return this.eventForm.get('recipients') as FormArray;
  }

  // Add a new recipient to the form
  addRecipient(): void {
    const recipientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.recipients.push(recipientForm);
  }

  // Remove a recipient from the form
  removeRecipient(index: number): void {
    this.recipients.removeAt(index);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;

      if (this.isEditMode && this.eventId) {
        this.eventService.updateEvent(this.eventId, formData);
      } else {
        const newEvent = {
          id: generateUniqueId(),
          ...formData,
        };
        this.eventService.addEvent(newEvent);
      }

      // Send email for each recipient
      formData.recipients.forEach(
        (recipient: { name: string; email: string }) => {
          const emailParams = {
            to_name: recipient.name,
            to_email: recipient.email,
            from_name: 'Event Manager',
            event_title: formData.title, // Event title
            location: formData.location, // Event location
            message: formData.description, // Event description
          };

          emailjs
            .send('service_08bd9yl', 'template_vwnfl19', emailParams)
            .then((response) => {
              console.log(
                'Invitations were sent! --->',
                response.status,
                response.text
              );
            })
            .catch((error) => {
              console.error('FAILED!...', error);
            });
        }
      );

      // Navigate back to the calendar
      this.router.navigate(['/events/calendar']);
    }
  }
}
