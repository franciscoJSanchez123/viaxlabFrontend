import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  
  
  activityForm: Iactivity={                               //variable que maneja el formulario
    activityId:0,
    title:'',
    startDate:'',
    endDate:'',
    status:'',
    type:'ACTIVITY',

  };
  @Input() activity!: Iactivity;                          //recibe desde app-component, recibe las actividades que se van a editar
  @Input() formType!: string;                             //recibe desde app-component, indica si se crea o edita una actividad
  @Output() newEventHideForm = new EventEmitter<any>();   //emite evento para esconder el formulario
  nameIsValid:boolean=true;                               //variable aux  para validar form
  
constructor(
  private activityService:ActivityService,
  ) { }

  

ngOnInit(): void {


  
}

//-------------------------------------------------------------------------------------------------------------------------
//escucha los cambios   en la variable activity que es la que recibe las actividades que se van a editar
//y luego los guarda en la 
//variable activityForm que es la que maneja el formulario

ngOnChanges(changes:any):void{
  let actividad=changes.activity.currentValue
  
  this.activityForm.activityId=actividad.activityId
  this.activityForm.title=actividad.title
  this.activityForm.startDate=actividad.startDate
  this.activityForm.endDate=actividad.endDate
  this.activityForm.status=actividad.status
  this.activityForm.type=actividad.type



}




//-------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------enviar formulario

//si el formulario es valido (se introdujo el nombre de la actividad) se chekea si se va a crear o editar una actividad
//luego se formatean las fechas y se llama al servicio de actividades para crear o editar la actividad segun sea el caso



submitForm(form:any) {

  if(form.form.status==='VALID'){
    
    this.nameIsValid=false

    if(this.formType==='new'){

      let objet={
        activityId:Math.floor(Math.random() * 100000000), 
        title:this.activityForm.title,
        type:this.activityForm.type,
        startDate:this.activityForm.startDate?(this.activityForm.startDate.replace('T', ' ').concat(':00')):null,
        endDate:this.activityForm.endDate?(this.activityForm.endDate.replace('T', ' ').concat(':00')):null,
        status:this.activityForm.status
      }

      this.activityService.createActivity(objet)
      this.newEventHideForm.emit()

    }else{

   
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

      
     
      this.activityService.updateActivity(objet)
      this.newEventHideForm.emit()
    }

  }else{
    
    this.nameIsValid=false
  }


}
//-------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------esconder  formulario



hideForm(){
  this.newEventHideForm.emit()
 
}

//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------detectar cambios en el input del nombre de la actividad para validacion


onChangeName(nameValidator:any){
    
  if(nameValidator.control.status==='INVALID'){
    this.nameIsValid=false
  }else{
    this.nameIsValid=true
  }

}

}
