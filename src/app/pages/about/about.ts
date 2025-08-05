import { Component } from '@angular/core';
import { TimelineComponent } from "../../components/timeline/timeline.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export default class AboutComponent {

}
