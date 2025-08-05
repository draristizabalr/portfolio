import { Component } from '@angular/core';
import { SkillsProgramingLanguagesComponent } from '../../components/skills-programing-languages/skills-programing-languages.component';
import { skills } from './constants';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillsProgramingLanguagesComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export default class SkillsComponent {
  // Properties
  skills = skills;
}
