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

      let objet={
        activityId:Math.floor(Math.random() * 100000000), 
        title:this.activityForm.title,
        type:'ACTIVITY',
        startDate:this.activityForm.startDate?(this.activityForm.startDate.replace('T', ' ').concat(':00')):null,
        endDate:this.activityForm.endDate?(this.activityForm.endDate.replace('T', ' ').concat(':00')):null,
        status:this.activityForm.status
      }

      
      console.log('fechas',objet)

      this.activityService.createActivity(objet)
      this.newEventHideForm.emit()

    }else{

      console.log('esto es lo que me otorga',this.activityForm.endDate)
      let start
      let end
      if(this.activityForm.startDate===null){
        start=this.activityForm.startDate
      }else if(this.activityForm.startDate.length===16){
        start=this.activityForm.startDate.replace('T', ' ').concat(':00')
      }else if(this.activityForm.startDate===''){
        start=null
      }else{
        start=this.activityForm.startDate
      }

      if(this.activityForm.endDate===null){
        end=this.activityForm.endDate
      }else if(this.activityForm.endDate.length===16){
        end=this.activityForm.endDate.replace('T', ' ').concat(':00')
      }else if(this.activityForm.endDate===''){
        end=null
      }else{
        end=this.activityForm.endDate
      }

      let objet={
        activityId:this.activityForm.activityId, 
        title:this.activityForm.title,
        type:this.activityForm.type,
        startDate:start,
        endDate:end,
        status:this.activityForm.status
      }

      
      //const objet={activityId:this.activityForm.activityId, title:this.activityForm.title,type:this.activityForm.type,startDate:this.activityForm.startDate,endDate:this.activityForm.endDate,status:this.activityForm.status}
      console.log('fechas',objet)
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
