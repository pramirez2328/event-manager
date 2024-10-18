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
import { environment } from '../../../environments/environment';
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
  formChanged: boolean = false;

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
    emailjs.init(environment.emailJsPublicKey); // Initialize EmailJS with your public key

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

    this.eventForm.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });
  }

  updateFormValidity(): void {
    // Set formChanged to true once any input field changes
    this.formChanged = true;
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
  }

  // Remove a recipient from the form array
  removeRecipient(index: number): void {
    this.recipients.removeAt(index); // Remove recipient at the given index
  }

  // Cancel the update and navigate back to the list or calendar view
  cancelUpdate(): void {
    if (this.router.url.includes('calendar')) {
      this.router.navigate(['/events/calendar']);
    } else {
      this.router.navigate(['/events/list']);
    }
  }

  // Check if the form is valid
  isFormValid(): boolean {
    const isEventFormValid = this.eventForm.valid;
    const hasRecipients = this.recipients.length > 0;
    const isFirstRecipientValid = hasRecipients && this.recipients.at(0).valid;

    return (this.formChanged && isEventFormValid) || isFirstRecipientValid;
  }

  // Update an existing event
  updateEvent(formData: any): void {
    this.eventService.updateEvent(this.eventId ?? '', formData);
    this.sendInvitations(formData);
  }

  // Send email to recipients
  sendInvitations(formData: any): void {
    console.log('Sending invitations to:', formData.recipients);
    formData.recipients.forEach((recipient: any) => {
      const { name, email } = recipient;
      const emailParams = this.buildEmailParams(name, email, formData);

      emailjs
        .send(
          environment.emailJsServiceId,
          environment.emailJsTemplateId,
          emailParams
        )
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
  }

  // Build email parameters
  buildEmailParams(to_name: string, to_email: string, formData: any): any {
    return {
      to_name,
      to_email,
      from_name: 'Event Manager',
      event_title: formData.title,
      location: formData.location,
      message: formData.description,
    };
  }

  // form submission
  onSubmit(): void {
    if (this.eventForm.invalid) return;

    const formData = this.eventForm.value;

    const existingRecipients =
      this.eventService.getEventById(this.eventId)?.recipients || [];
    formData.recipients = [...existingRecipients, ...formData.recipients];

    // If in edit mode, update the existing event
    if (this.isEditMode && this.eventId) {
      this.updateEvent(formData);
    } else {
      const newEvent = {
        id: generateUniqueId(),
        ...formData,
      };
      this.eventService.addEvent(newEvent);
      this.sendInvitations(newEvent);
    }

    // Navigate back to the calendar
    this.router.navigate(['/events/calendar']);
  }
}
