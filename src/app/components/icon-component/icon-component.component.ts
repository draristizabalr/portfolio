import { Component, input } from '@angular/core';

export type iconName = 'javascript' | 'typescript' | 'react' | 'angular' | 'nodejs' | 'python';

@Component({
  selector: 'app-icon-component',
  imports: [],
  templateUrl: './icon-component.component.html',
})
export class IconComponent {
  // Inputs
  iconName = input.required<iconName>();
}
