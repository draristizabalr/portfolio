import { Component, input } from '@angular/core';

export type iconName = 'javascript' | 'typescript' | 'react' | 'angular' | 'nodejs' | 'python' | 'fastapi' | 'postgresql' | 'docker' | 'vue';

@Component({
  selector: 'app-icon-component',
  imports: [],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  // Inputs
  iconName = input.required<iconName>();
  iconClass = input<string>();
}
