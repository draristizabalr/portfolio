import { Component, ElementRef, viewChild } from '@angular/core';

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
}
