import { Component } from '@angular/core';
import { projects } from './constants/projects.constants';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export default class ProjectsComponent {
  // Properties
  projects = projects;
}
