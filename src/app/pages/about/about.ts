import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export default class AboutComponent {

}
