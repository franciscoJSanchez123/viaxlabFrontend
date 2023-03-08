import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { activities } from './activities/activities';
import  { Iactivity} from './models/Iactivity';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { InteractionService} from './services/interaction-services/interaction.service'
import { ActivityService} from './services/activity-service/activity.service'
import { LocalStorageService } from './services/localStorage-service/local-storage.service';
import { ActivitiesListComponent } from './component/activities-list/activities-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'viaxlab';
  hide:boolean=false;
  activities:Iactivity[]=[]
  activity!:Iactivity
  activityAux!:Iactivity
  datesActivities:any[]=[];
  date!:any;
  arrayGroupByDates:any[]=[];
  formType:string=''






  constructor(
    private interactionService:InteractionService,
    private activityService:ActivityService,
    private localStorageService:LocalStorageService
    ) { }


  ngOnInit(): void {

    this.activities=this.activityService.findAllActivities()
    this.localStorageService.activitiesChange.subscribe(async ()=>{
      this.activities= await this.localStorageService.getActivities()
      this.groupByDate3()

    })


    //this.groupByDate()
    this.groupByDate3()

    this.interactionService.hideActivityForm.subscribe(data=>{
      this.hide=data;
    })
    
  }


  addActivity(data:any){
    console.log(data,'aqui addactivity')
    this.activityAux=data.activity
    this.formType=data.option
  }

  createActivity(){
    //this.interactionService.hide(option)
    this.hide=!this.hide
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:null,endDate:null,status:null}
    this.formType='new'
  }


  hideActivityForm(){
    this.hide=!this.hide
  }
/**------------------------------------------------------------------------------------------------------------------------------------ */

/*
  addActivityWithDate(date:any){
    this.interactionService.hide('change')
    this.interactionService.addActivityWithDate(date)
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:date,endDate:null,status:null}
    
  }
 
  


  hideForm(option:string){
    this.interactionService.hide(option)
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:null,endDate:null,status:null}
  }
*/
/**------------------------------------------------------------------------------------------------------------------------------------ */
/** 
  moveActivity(dropEvent:CdkDragDrop<any>):void{
    const {previousContainer,container,currentIndex,previousIndex}=dropEvent ;
    if(previousContainer === container){
      console.log('esto es lo importante ',previousContainer,container ,currentIndex,previousIndex)
      moveItemInArray(container.data, previousIndex,currentIndex);
      return
    }
      
    transferArrayItem(
      previousContainer.data,
      container.data,
      previousIndex,
      currentIndex,
    );

  
   

    console.log('esto es lo importante ',dropEvent,previousContainer,container ,currentIndex,previousIndex)
    //moveItemInArray(container.data, previousIndex,currentIndex);

  }

*/
/**------------------------------------------------------------------------------------------------------------------------------------ */



  groupByDate3(){

    this.arrayGroupByDates=[];
    console.log('que fue lo que recibio ps',this.activities)
    this.activities.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    console.log('organizado por fecha',this.activities)
    this.activities.forEach((element:Iactivity,i:number) => {

      let currentDate=new Date(element.startDate).setHours(0, 0, 0)
     
       if(element.startDate){
        console.log('que es esto',this.arrayGroupByDates[1])
        console.log('todo bien aqui3')
        
          if(i===0){

            
            let miArray:any[]=[]
            miArray.push(element)
            this.arrayGroupByDates.push({ key1: element.startDate, array: miArray})
            console.log('todo bien aqui 2')

          }else if((i!=0) && (this.arrayGroupByDates[this.arrayGroupByDates.length-1].key1 != null)){
            
            let previousDate=new Date(this.arrayGroupByDates[this.arrayGroupByDates.length-1].key1).setHours(0, 0, 0)
            console.log('todo bien aqui4')
            if(currentDate===previousDate ){
              
              this.arrayGroupByDates[this.arrayGroupByDates.length-1].array.push(element)
              console.log('todo bien aqui 5')
           
            }else{
                
                let miArray:any[]=[]
                miArray.push(element)
                this.arrayGroupByDates.push({ key1: element.startDate, array: miArray})
                console.log('todo bien aqui 6',this.arrayGroupByDates)
            }

          }else if((i!=0) && (element.startDate)){

            let miArray:any[]=[]
            miArray.push(element)
            this.arrayGroupByDates.push({ key1:element.startDate, array: miArray})
            console.log('todo bien aqui 7',this.arrayGroupByDates)

          }else{
            
            this.arrayGroupByDates[0].array.push(element)
            console.log('todo bien aqui 8')

          }
          

       }else{
            if(i===0){
              let miArray:any[]=[]
              miArray.push(element)
              this.arrayGroupByDates[0]={ key1: null, array: miArray}
              console.log('todo bien aqui')

            }else{
              this.arrayGroupByDates[0].array.push(element)
              console.log('todo bien aqui null 2 ',this.arrayGroupByDates)

            }

       }

       
    });
    console.log('se completo',this.arrayGroupByDates,'asi quedaron las activities:',this.activities)
   
  }
}
