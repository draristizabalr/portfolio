import { Component, input, signal } from '@angular/core';
import { IconComponent, iconName } from '../icon-component/icon-component.component';

@Component({
  selector: 'app-skills-programing-languages',
  imports: [IconComponent],
  templateUrl: './skills-programing-languages.component.html',
})
export class SkillsProgramingLanguagesComponent {
  // Inputs
  technologyName = input.required<string>();
  yearsOfExperience = input.required<string>();
  technologyIcon = input.required<iconName>();
  colorTheme = input.required<'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'>();
  skillLevel = input.required<string>();

}
