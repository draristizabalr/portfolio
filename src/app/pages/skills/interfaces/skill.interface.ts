import { iconName } from "../../../components/icon-component/icon-component.component";

export interface Skill {
  technologyName: string;
  yearsOfExperience: string;
  technologyIcon: iconName;
  colorTheme: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  skillLevel: string;
}
