import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { InteractionService} from '../../services/interaction-services/interaction.service'
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  @Input() activity!: Iactivity;
  @Input() formType!: string;
  @Output() newEventHideForm = new EventEmitter<any>();
  nameIsValid:boolean=true;
  
constructor(
  private interactionService:InteractionService,
  private activityService:ActivityService,
  ) { }

  

ngOnInit(): void {

 
  
}


submitForm(form:any) {

  if(form.form.status==='VALID'){
    console.log('es valido')
    this.nameIsValid=false

    if(this.formType==='new'){
      const objet={activityId:100, title:this.activity.title,type:'ACTIVITY',startDate:this.activity.startDate,endDate:this.activity.endDate,status:this.activity.status}
      this.activityService.createActivity(objet)
      this.newEventHideForm.emit()

    }else{
      const objet={activityId:this.activity.activityId, title:this.activity.title,type:'ACTIVITY',startDate:this.activity.startDate,endDate:this.activity.endDate,status:this.activity.status}
      this.activityService.updateActivity(objet)
      this.newEventHideForm.emit()
    }

  }else{
    console.log('no es valido')
    this.nameIsValid=false
  }

  

  



}

hideForm(){
  this.newEventHideForm.emit()
 
}

onChangeName(nameValidator:any){
    
  if(nameValidator.control.status==='INVALID'){
    this.nameIsValid=false
  }else{
    this.nameIsValid=true
  }

}

}
