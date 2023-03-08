import {  Component } from '@angular/core';

import  { Iactivity} from './models/Iactivity';

import { ActivityService} from './services/activity-service/activity.service'
import { LocalStorageService } from './services/localStorage-service/local-storage.service';

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
   
    private activityService:ActivityService,
    private localStorageService:LocalStorageService
    ) { }


  ngOnInit(): void {

    this.activities=this.activityService.findAllActivities()
    this.localStorageService.activitiesChange.subscribe(async ()=>{
      this.activities= await this.localStorageService.getActivities()
      this.groupByDate()

    })


    this.groupByDate()

  }



/**------------------------------------------------------------------------------------------------------------------------------------ */
  addActivity(data:any):void{
   
    this.activityAux=data.activity
    this.formType=data.option
  }

  createActivity():void{
    
    this.hide=!this.hide
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:null,endDate:null,status:null}
    this.formType='new'
  }

/**------------------------------------------------------------------------------------------------------------------------------------ */
  hideActivityForm():void{
    this.hide=!this.hide
  }

/**------------------------------------------------------------------------------------------------------------------------------------ */
groupByDate(){

    this.arrayGroupByDates=[];
    let miArray:any[]=[]
    this.activities.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())


    this.activities.forEach((element:Iactivity,i:number) => {

        let currentDate=new Date(element.startDate).setHours(0, 0, 0)

        if(i===0){

            miArray=[]
            miArray.push(element)
            this.arrayGroupByDates.push({ key1: element.startDate, array: miArray})



        }else{


            let previousDate=new Date(this.arrayGroupByDates[this.arrayGroupByDates.length-1].key1).setHours(0, 0, 0)
            
            if(currentDate===previousDate ){
              
              this.arrayGroupByDates[this.arrayGroupByDates.length-1].array.push(element)
             
           
            }else{
                
                miArray=[]
                miArray.push(element)
                this.arrayGroupByDates.push({ key1: element.startDate, array: miArray})
                
            }


        }

    })


}
  
}
