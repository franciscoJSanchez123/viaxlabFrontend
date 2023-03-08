import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-avatar',
  templateUrl: './activity-avatar.component.html',
  styleUrls: ['./activity-avatar.component.css']
})
export class ActivityAvatarComponent {
  @Input() activityType: string="";
}
