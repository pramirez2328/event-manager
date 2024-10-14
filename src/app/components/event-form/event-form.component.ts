import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { generateUniqueId } from '../../../util/generateUniqueId';
import * as emailjs from '@emailjs/browser';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  isEditMode: boolean = false;
  eventId: string | null = null;
  allRecipients: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      recipients: this.fb.array([this.createRecipientForm()]), // Initialize with one recipient form
      date: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    emailjs.init('pr1UJGTPULYPKkq54'); // Initialize EmailJS with your public key

    this.route.queryParams.subscribe((params) => {
      if (params['date']) {
        this.eventForm.patchValue({ date: params['date'] });
      }

      if (params['id']) {
        this.isEditMode = true;
        this.eventId = params['id'];
        const existingEvent = this.eventService.getEventById(this.eventId);
        if (existingEvent) {
          this.eventForm.patchValue({
            title: existingEvent.title,
            location: existingEvent.location,
            description: existingEvent.description,
            date: existingEvent.date,
          });

          const recipientsArray = this.eventForm.get('recipients') as FormArray;
          recipientsArray.clear(); // Clear the FormArray before re-adding

          existingEvent.recipients.forEach((recipient: any) => {
            this.allRecipients.push(`${recipient.name} (${recipient.email})`);
          });
        }
      }
    });
  }

  // Create a new recipient form group
  createRecipientForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Getter for the recipients form array
  get recipients(): FormArray {
    return this.eventForm.get('recipients') as FormArray;
  }

  // Add a new recipient to the form array
  addRecipient(): void {
    const recipientFormArray = this.recipients;
    recipientFormArray.push(this.createRecipientForm()); // Add new recipient form group
    console.log(
      'Added new recipient form. Current recipients:',
      recipientFormArray.value
    );
  }

  // Remove a recipient from the form array
  removeRecipient(index: number): void {
    this.recipients.removeAt(index); // Remove recipient at the given index
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

      // Send email to all recipients
      this.allRecipients.forEach((recipient) => {
        const [name, email] = recipient.split(' (');
        const emailParams = {
          to_name: name,
          to_email: email.slice(0, -1), // Remove trailing ')'
          from_name: 'Event Manager',
          event_title: formData.title,
          location: formData.location,
          message: formData.description,
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
      });

      // Navigate back to the calendar
      this.router.navigate(['/events/calendar']);
    }
  }
}
