import { Component } from '@angular/core';
import { TIMELINE_INFO } from '../../pages/about/constants/timeline.constant';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  timelineInfo = TIMELINE_INFO;
}
