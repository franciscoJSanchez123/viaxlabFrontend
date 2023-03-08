import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CdkDragDrop } from '@angular/cdk/drag-drop';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent {
  
  activity!:Iactivity
  activityAux!:Iactivity
  @Input() arrayGroupByDates!: any[];            //arreglo recibido desde app component con las actividades agrupadas por fecha  
  @Output() newEvent = new EventEmitter<any>();  //emite un evento (hijo-padre) hacia  app-component con la actividad que se va a editar para enviarla al formulario



  constructor(
    
    private activityService:ActivityService
    ) { }




    
      
   

  /**------------------------------------------------------------------------------------------------------------------------------------ */
  /**---------Manipular actividades------------------------ */



  editActivity(activity:Iactivity):void{                  //se ejecuta por evento (hijo-padre) desde app-activity para editar una actividad

    this.newEvent.emit({activity,option:'edit'});    //se emite un evento (hijo-padre) hacia  app-component con la actividad que se va a editar para enviarla al formulario



  }
 


  createActivity(date:any):void{                      //se ejecuta al hacer click en "+ nueva"

    

    if(date){
      this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:date,endDate:null,status:null}
    }else{
      this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:null,endDate:null,status:null}

    }
    this.newEvent.emit({activity:this.activityAux,option:'new'});         //se emite un evento (hijo-padre) hacia  app-component con la actividad que se va a editar para enviarla al formulario
    
  }





/**------------------------------------------------------------------------------------------------------------------------------------ */
/**-------------------------------mover una actividad de una columna a otra--------------------------------- */


//se manupulan la horas y las fechas de la actividad que se esta moviendo
//y luego se llama al servicio de actividades para editar la actividad
//a la que se le cambio la fecha

  moveActivity(dropEvent:CdkDragDrop<any>,date:string):void{
    const {previousContainer,container}=dropEvent ;
    if(previousContainer === container){
      
      return 
    }

    this.activity=dropEvent.item.data
    
    if(date===null){
      this.activity.startDate=null
      this.activityService.updateActivity(this.activity)


    }else{
      let year=(new Date(date)).getFullYear()
    

      let day=(new Date(date)).getDate()
      let dayAux
      day<10?dayAux=`0${day}`:dayAux=`${day}`
     

      let month=(new Date(date)).getMonth()+1
      let monthAux
      month<10?monthAux=`0${month}`: monthAux=`${month}`
    
  
      let hourAux
      let minAux
      if(this.activity.startDate===null){
        hourAux=`00`
        minAux=`00`
      }else{
        let hour=(new Date(this.activity.startDate)).getHours();
        hour<10?hourAux=`0${hour}`:hourAux=`${hour}`
  
        let min=(new Date(this.activity.startDate)).getMinutes();
        min<10?minAux=`0${min}`:minAux=`${min}`
  
      }
     
  
  
      this.activity.startDate=`${year}-${monthAux}-${dayAux} ${hourAux}:${minAux}:00`
      this.activityService.updateActivity(this.activity)



    }
     
  }

  /**------------------------------------------------------------------------------------------------------------------------------------ */
/**-----------------------------Formatear Fecha-------------------------------------------------------- */
  

//metodo para formatear las fechas de las lista 
  formatDate(date:string):string{

    
    let day=(new Date(date)).getDate()
    let monthAux=(new Date(date)).getMonth()
    let month;

    switch(monthAux){

      case 0:
        month='enero'
      break;

      case 1:
        month='febrero'
      break;

      case 2:
        month='marzo'
      break;

      case 3:
        month='abril'
      break;

      case 4:
        month='mayo'
      break;

      case 5:
        month='junio'
      break;

      case 6:
        month='julio'
      break;

      case 7:
        month='agosto'
      break;

      case 8:
        month='septiembre'
      break;

      case 9:
        month='octubre'
      break;

      case 10:
        month='noviembre'
      break;

      case 11:
        month='diciembre'
      break;

    }

    return `${day} de ${month}`
  }
}
