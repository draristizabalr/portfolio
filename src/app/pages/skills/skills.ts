import { Component } from '@angular/core';
import { skills } from './constants';
import { SkillsProgramingLanguagesComponent } from './components/skills-programing-languages/skills-programing-languages.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillsProgramingLanguagesComponent],
  templateUrl: './skills.html',
})
export default class SkillsComponent {
  // Properties
  skills = skills;
}
