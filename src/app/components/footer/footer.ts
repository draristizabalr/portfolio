import { Component, effect, ElementRef, OnInit, viewChild } from '@angular/core';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  
  // Viewchilds
  linkedinIcon = viewChild.required<ElementRef<HTMLAnchorElement>>('linkedIn');
  githubIcon = viewChild.required<ElementRef<HTMLAnchorElement>>('github');

  constructor() {
    effect(() => {
      tippy(this.linkedinIcon().nativeElement, {
        content: 'LinkedIn'
      });
  
      tippy(this.githubIcon().nativeElement, {
        content: 'GitHub'
      });
    })

  }
}
