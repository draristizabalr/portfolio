import { Component, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ErrorContactFormPipe } from './error-contact-form.pipe';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorContactFormPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export default class ContactComponent {
  // Injects
  private fb = inject(FormBuilder);

  // Form
  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    message: ['', [Validators.required]],
  });

  // Signals
  invalidForm = signal(this.contactForm.invalid && this.contactForm.touched);
  errors = signal<ValidationErrors | null>(null);
  emailSent = signal(false);

  constructor() {
    effect(() => {
      console.log(this.errors());
    });
  }

  onSubmit(event: Event) {
    this.contactForm.markAllAsTouched();
    this.invalidForm.set(this.contactForm.invalid && this.contactForm.touched);
    if (this.contactForm.invalid) {
      this.setErrors();
      return;
    }

    this.sendEmail(event);
  }

  setErrors() {
    const controls = this.contactForm.controls;
    const errors = Object.entries(controls).reduce((acc, [key, control]) => {
      if (control.errors) {
        acc[key] = control.errors;
      }
      return acc;
    }, {} as ValidationErrors);

    this.errors.set(errors);
  }

  sendEmail(event: Event) {
    const serviceID = 'default_service';
    const templateID = 'template_1bkg1kd';

    emailjs
      .sendForm(serviceID, templateID, event.target as HTMLFormElement, {
        publicKey: 'sL7FGBqQ83qPS9_qR',
      })
      .then(
        () => {
          this.emailSent.set(true);
          this.contactForm.reset();
          setTimeout(() => {
            this.emailSent.set(false);
          }, 4000);
        },
        (error) => {
          console.log('Error: ', (error as EmailJSResponseStatus).text);
        },
      );
  }
}
