import { JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorContactFormPipe } from './error-contact-form.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorContactFormPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export default class ContactComponent {
  // Injects
  private fb = inject(FormBuilder);

  // Form
  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    message: ['', [Validators.required]]
  });

  // Signals
  invalidForm = signal(this.contactForm.invalid && this.contactForm.touched);
  errors = signal<ValidationErrors | null>(null);

  constructor() {
    effect(() => {
      console.log(this.errors());
    })
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    this.invalidForm.set(this.contactForm.invalid && this.contactForm.touched);
    if (this.contactForm.invalid) {
      this.setErrors();
      return
    };

    const { name, email, message } = this.contactForm.value;
    console.table({ name, email, message });
  }

  setErrors() {
    const controls = this.contactForm.controls;
    const errors = Object.entries(controls).reduce((acc, [key, control]) => {
      if (control.errors) {
        acc[key] = control.errors;
      }
      return acc;
    }, {} as ValidationErrors);
    console.log(errors);
    this.errors.set(errors);
  }
}
