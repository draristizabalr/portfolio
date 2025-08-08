import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    class: 'sticky top-0 z-50'
  }
})
export class HeaderComponent {
  // Signals
  themeToggler = new FormControl('themeToggler', { nonNullable: true });
  theme = toSignal(
    this.themeToggler.valueChanges.pipe(
      map((value) => {
        if (value) return 'dark';
        return 'corporate';
      })
    )
  );

  constructor() {
    effect(() => {
      window.sessionStorage.setItem('darkTheme', this.theme() ?? 'dark');
      document.documentElement.setAttribute('data-theme', this.theme() ?? 'dark');
    });
  }

  closeDropdown() {
    const elem = document.activeElement;
    if (elem instanceof HTMLElement) {
      elem.blur();
    }
  }
}
