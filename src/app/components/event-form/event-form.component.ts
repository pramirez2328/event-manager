import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      numberOfPeople: [1, Validators.required], // This can be further expanded
      emails: ['', Validators.required], // This can be further expanded
      location: ['', Validators.required],
      description: ['', Validators.required],
      date: [''], // This field will be pre-filled with the clicked date
    });
  }

  ngOnInit(): void {
    // Inject the clicked date into the form
  }

  // Submit the form data
  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log('Form submitted', this.eventForm.value);
      // You can handle the form submission here (e.g., emit event, save data)
    }
  }
}
