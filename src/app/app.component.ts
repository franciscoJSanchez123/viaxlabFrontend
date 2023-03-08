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
  activities:Iactivity[]=[]  
  arrayGroupByDates:any[]=[];     //arreglo con las actividades agrupadas por fecha  
  activityAux!:Iactivity          //se comunica (padre-hijo) con el formulario para enviar la actividad que se va a añadir 
  formType:string=''              //se comunica (padre-hijo) con el formulario e indica si se crea o edita una actividad
  hide:boolean=false;             //esconde o muestra el formulario






  constructor(
   
    private activityService:ActivityService,
    private localStorageService:LocalStorageService
    ) { }

/**------------------------------------------------------------------------------------------------------------------------------------ */
/**---------solicitar actividades y permanecer escuchando por cambios en el array de actividads------------------------ */
  ngOnInit(): void {

    this.activities=this.activityService.findAllActivities()
    this.localStorageService.activitiesChange.subscribe(async ()=>{
      this.activities= await this.localStorageService.getActivities()
      this.groupByDate()

    })


    this.groupByDate()

  }






/**------------------------------------------------------------------------------------------------------------------------------------ */
/**---------Manipular actividades------------------------ */




  addActivity(data:any):void{   //se ejecuta por evento (hijo-padre) desde activities list para crear o editar una actividad
   
    this.activityAux=data.activity  //se comunica (padre-hijo) con el formulario para enviar la actividad que se va a añadir 
    this.formType=data.option       //se comunica (padre-hijo) con el formulario e indica si se crea o edita una actividad
  }





  createActivity():void{      //se ejecuta al hacer click en el boton
    
    this.hide=!this.hide       //cambiar estado del formulario
    this.activityAux={activityId:100, title:'',type:'ACTIVITY',startDate:null,endDate:null,status:null}   //se comunica (padre-hijo) con el formulario para enviar la actividad que se va a añadir
    this.formType='new'                                                                                    //se comunica (padre-hijo) con el formulario e indica si se crea o edita una actividad
  }






/**------------------------------------------------------------------------------------------------------------------------------------ */

/**---------Esconder formulario------------------------ */


  hideActivityForm():void{            //se ejecuta por evento (hijo-padre) desde activities list para cambiar estado del formulario
    this.hide=!this.hide
  }









/**------------------------------------------------------------------------------------------------------------------------------------ */
/**---------Crear arreglo con las actividades agrupadas por fecha------------------------ */

groupByDate():void{

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
