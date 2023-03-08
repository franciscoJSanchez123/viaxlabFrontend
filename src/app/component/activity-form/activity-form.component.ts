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
  //name2:string = '';
  //date1 :any= '2023-03-06T07:56';
  //date2:any = '';
  @Input() activity!: Iactivity;
  @Input() formType!: string;
  @Output() newEventHideForm = new EventEmitter<any>();
  nameIsValid:boolean=true;
  
constructor(
  private interactionService:InteractionService,
  private activityService:ActivityService,
  ) { }

  

ngOnInit(): void {

    /*
  this.interactionService.activityWithDate.subscribe(data=>{
    console.log(data)
    this.date1='2023-03-07T07:56'
    this.name2='epa'
    
    console.log(this.date1,this.name2)
  })

 */
  
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
      console.log('todo bien aqui en el formulario',objet)
      this.activityService.updateActivity(objet)
      this.newEventHideForm.emit()
    }

  }else{
    console.log('no es valido')
    this.nameIsValid=false
  }

  

  


  //console.log(`Name: ${this.name2}, Date 1: ${this.date1}, Date 2: ${this.date2}`);

  //const objet={activityId:100, title:this.name2,type:'ACTIVITY',startDate:new Date(this.date1),endDate:this.date2,status:null}
  //this.activityService.createActivity(objet)
  //console.log('funciono??')
}

hideForm(){
  //this.activityService.clearAllActivities()
  //this.interactionService.hide(option)
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
