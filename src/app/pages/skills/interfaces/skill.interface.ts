import { iconName } from "../../../shared/components/icon-component/icon.component";

export interface Skill {
  technologyName: string;
  yearsOfExperience: string;
  technologyIcon: iconName;
  colorTheme: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  skillLevel: string;
}
