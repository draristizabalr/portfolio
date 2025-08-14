import { Component, input } from '@angular/core';
import { IconComponent, iconName } from '../../../../shared/components/icon-component/icon.component';

@Component({
  selector: 'app-skills-programing-languages',
  imports: [IconComponent],
  templateUrl: './skills-programing-languages.component.html',
  host: {
    class: 'w-full border-none',
  }
})
export class SkillsProgramingLanguagesComponent {
  // Inputs
  technologyName = input.required<string>();
  yearsOfExperience = input.required<string>();
  technologyIcon = input.required<iconName>();
  skillLevel = input.required<string>();
}
