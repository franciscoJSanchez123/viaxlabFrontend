import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  hideStatus:boolean=false                         //mostrar o ocultar menu de  opciones de la actividad 
  @Input() activity!:Iactivity                     //actividad recibida desde activies list  
  @Output() newEvent = new EventEmitter<any>();    //emite un evento (hijo-padre) hacia  app-activities-list con la actividad que se va a editar para enviarla al formulario


  constructor(
    private activityService:ActivityService,
    ) { }







    
//---------------------------------------------------------------------------------------------
/**---------Manipular actividades------------------------ */



    editActivity(activity:Iactivity):void{          //se ejecuta al hacer click en icono de editar
     
      this.newEvent.emit(activity);                          //se emite un evento (hijo-padre) hacia  app-acivities list con la actividad que se va a editar para enviarla al formulario
     
      
    }

    editStatus(activity:Iactivity,status:any):void{    //se ejecuta al hacer click en las opciones para cambiar estado de la actividad
      activity.status=status
      this.activityService.updateActivity(activity)  //llama al servicio de actividades para actualizar la actividad
    }

    

    deleteActivity(id:number):void{                    //se ejecuta al hacer click en la opcion "Eliminar Actividad"
      this.activityService.deleteActivity(id)     //llama al servicio de actividades para eliminar  la actividad
    }









//---------------------------------------------------------------------------------------------
//--------------deplegar opciones para modificar estado de la actividad-----------------------

    changeHideStatus():void{                             //se ejecuta al hacer click en el icono menu
      this.hideStatus=!this.hideStatus
    }





//---------------------------------------------------------------------------------------------
//----------------extarer hora de la actividad-------------------------------------

    extractTime(date:string):string{
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
