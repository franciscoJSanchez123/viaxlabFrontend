import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  
  
  activityForm: Iactivity={
    activityId:0,
    title:'',
    startDate:'',
    endDate:'',
    status:'',
    type:'',

  };
  @Input() activity!: Iactivity;
  @Input() formType!: string;
  @Output() newEventHideForm = new EventEmitter<any>();
  nameIsValid:boolean=true;
  
constructor(
  private activityService:ActivityService,
  ) { }

  

ngOnInit(): void {


  
}


ngOnChanges(changes:any):void{
  let actividad=changes.activity.currentValue
  
  this.activityForm.activityId=actividad.activityId
  this.activityForm.title=actividad.title
  this.activityForm.startDate=actividad.startDate
  this.activityForm.endDate=actividad.endDate
  this.activityForm.status=actividad.status
  this.activityForm.type=actividad.type



}

submitForm(form:any) {

  if(form.form.status==='VALID'){
    
    this.nameIsValid=false

    if(this.formType==='new'){
      const objet={activityId:Math.floor(Math.random() * 100000000), title:this.activityForm.title,type:'ACTIVITY',startDate:this.activityForm.startDate,endDate:this.activityForm.endDate,status:this.activityForm.status}
      this.activityService.createActivity(objet)
      this.newEventHideForm.emit()

    }else{
      const objet={activityId:this.activityForm.activityId, title:this.activityForm.title,type:this.activityForm.type,startDate:this.activityForm.startDate,endDate:this.activityForm.endDate,status:this.activityForm.status}
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
