import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { InteractionService } from 'src/app/services/interaction-services/interaction.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  activities:Iactivity[]=[]
  @Input() activity!:Iactivity
  activityAux!:Iactivity
  @Output() newEvent = new EventEmitter<any>();
  hideStatus:boolean=false
  @Output() newEventHideForm = new EventEmitter<any>();
  constructor(
    private interactionService:InteractionService,
    private activityService:ActivityService,
    ) { }

    editActivity(activityAux:Iactivity){
      //this.interactionService.hide('change')
      //this.interactionService.addActivityWithDate(date)
      //this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:date,endDate:null,status:null}
      console.log(activityAux, 'ultimo componente')
      this.newEventHideForm.emit()
      this.newEvent.emit(activityAux);
      
    }

    editStatus(activity:Iactivity,status:any){
      activity.status=status
      this.activityService.updateActivity(activity)
    }

    changeHideStatus(){
      this.hideStatus=!this.hideStatus
    }

    deleteActivity(id:number){
      this.activityService.deleteActivity(id)
    }

    extractTime(date:string){
      let hourAux=(new Date(date)).getHours();
      let minAux=(new Date(date)).getMinutes();
      let hour=`${hourAux}`;
      let min=`${minAux}`;
      if(hourAux<10) hour=`0${hourAux}`
      if(minAux<10) min=`0${minAux}`
     
      
      return `${hour}:${min}`
    }
}
