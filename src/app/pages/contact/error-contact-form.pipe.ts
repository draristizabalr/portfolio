import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorContactForm',
})
export class ErrorContactFormPipe implements PipeTransform {

  transform(value: ValidationErrors | null): string {
    if (!value) return '';

    const { name, email, message } = value;

    if (name?.required) return 'Name is required';
    if (email?.required) return 'Email is required';
    if (email?.pattern) return 'Invalid email';
    if (message?.required) return 'Message is required';
    return '';
  }

}
