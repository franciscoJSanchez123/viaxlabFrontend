import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CdkDragDrop } from '@angular/cdk/drag-drop';
import { Iactivity } from 'src/app/models/Iactivity';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { LocalStorageService } from 'src/app/services/localStorage-service/local-storage.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent {
  activities:Iactivity[]=[]
  activity!:Iactivity
  activityAux!:Iactivity
  @Input() arrayGroupByDates!: any[];
  @Output() newEvent = new EventEmitter<any>();
  @Output() newEventHideForm = new EventEmitter<any>();



  constructor(
    
    private activityService:ActivityService,
    private localStorageService:LocalStorageService
    ) { }




    
      
   

  /**------------------------------------------------------------------------------------------------------------------------------------ */

  editActivity(activity:Iactivity){

    this.newEvent.emit({activity,option:'edit'});



  }
  addActivityWithDate(date:any){
   
    this.newEventHideForm.emit()
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:date,endDate:null,status:null}
    this.newEvent.emit({activity:this.activityAux,option:'new'});
    
  }
 
  


  createActivity(option:string){
    
    this.newEventHideForm.emit()
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:null,endDate:null,status:null}
    this.newEvent.emit({activity:this.activityAux,option:'new'});
    
  }

/**------------------------------------------------------------------------------------------------------------------------------------ */

  hideActivityForm(){
    this.newEventHideForm.emit()
  }

  

  
    

/**------------------------------------------------------------------------------------------------------------------------------------ */


  moveActivity(dropEvent:CdkDragDrop<any>,date:string):void{
    const {previousContainer,container,currentIndex,previousIndex}=dropEvent ;
    if(previousContainer === container){
      
      return 
    }

    this.activity=dropEvent.item.data
    
    let year=(new Date(date)).getFullYear()
    
    let day=(new Date(date)).getDate()
    let dayAux
    day<10?dayAux=`0${day}`:dayAux=`${day}`
   
    let month=(new Date(date)).getMonth()+1
    let monthAux
    month<10?monthAux=`0${month}`: monthAux=`${month}`
  

    let hour=(new Date(this.activity.startDate)).getHours();
    let hourAux
    hour<10?hourAux=`0${hour}`:hourAux=`${hour}`


    let min=(new Date(this.activity.startDate)).getMinutes();
    let minAux
    min<10?minAux=`0${min}`:minAux=`${min}`

    this.activity.startDate=`${year}-${month}-${day} ${hour}:${min}:00`
    this.activityService.updateActivity(this.activity)
     
  }

  /**------------------------------------------------------------------------------------------------------------------------------------ */

  formatDate(date:string){

    
    let day=(new Date(date)).getDate()
    let monthAux=(new Date(date)).getMonth()
    let month;
    console.log('aqui esta el dia',date, day,(new Date(date)))

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
