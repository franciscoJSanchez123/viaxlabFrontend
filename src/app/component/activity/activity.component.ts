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
  activityAux!:Iactivity
  hideStatus:boolean=false
  @Input() activity!:Iactivity
  @Output() newEvent = new EventEmitter<any>();
  @Output() newEventHideForm = new EventEmitter<any>();


  constructor(
   private interactionService:InteractionService,
    private activityService:ActivityService,
    ) { }



//---------------------------------------------------------------------------------------------

    editActivity(activityAux:Iactivity){
     
      this.newEventHideForm.emit()
      this.newEvent.emit(activityAux);
      //this.interactionService.addActivityWithDate(activityAux)
      
    }

    editStatus(activity:Iactivity,status:any){
      activity.status=status
      this.activityService.updateActivity(activity)
    }

    

    deleteActivity(id:number){
      this.activityService.deleteActivity(id)
    }

//---------------------------------------------------------------------------------------------

    changeHideStatus(){
      this.hideStatus=!this.hideStatus
    }
//---------------------------------------------------------------------------------------------
    extractTime(date:string){
      let hour;
      let min;
      if(!date){
        return ''

      }else{
        let hourAux=(new Date(date)).getHours();
        let minAux=(new Date(date)).getMinutes();
        hour=`${hourAux}`;
        min=`${minAux}`;
        if(hourAux<10) hour=`0${hourAux}`
        if(minAux<10) min=`0${minAux}`
      }
     
      
      return `${hour}:${min}`
    }
}
