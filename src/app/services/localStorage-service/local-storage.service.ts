import { Injectable,EventEmitter } from '@angular/core';
import { Iactivity} from '../../models/Iactivity'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  activity!:Iactivity;
  activities:Iactivity[]=[];
  activitiesAux:any;
  activitiesChange:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  async saveActivity(activity:Iactivity){
    this.activity=activity;
    //this.activities= await this.getActivities()
    this.activities=await this.getActivities()
    console.log(this.activities,'que es esto')
    this.activities.push(this.activity)
    this.saveActivities(this.activities)

  }

  async updateActivity(activity:Iactivity){
    console.log('asi llega al local',activity)
    this.activities=await this.getActivities()
    let index = this.activities.findIndex(data => data.activityId === activity.activityId);
    if (index !== -1) {
      this.activities.splice(index, 1, {
        activityId: activity.activityId,
        title:activity.title,
        startDate:activity.startDate,
        endDate:activity.endDate,
        status:activity.status,
        type:activity.type
       
      });
    }
    console.log('asi queda el arreglo',this.activities)
    this.saveActivities(this.activities)

  }

  saveActivities(activities:Iactivity[]){

    localStorage.setItem('activities',JSON.stringify(activities));
    this.activitiesChange.emit()
  }


  async getActivities(){
    this.activitiesAux=  localStorage.getItem('activities');
    this.activities= await JSON.parse(this.activitiesAux);
    return this.activities;
  }

  deleteAllActivities(){
    localStorage.removeItem("activities");
    this.activitiesChange.emit()
  }

  async deleteActivity(id:number){
    this.activities=await this.getActivities()
    let index = this.activities.findIndex(activity => activity.activityId === id);
    if (index !== -1)this.activities.splice(index, 1)
    this.saveActivities(this.activities)
    console.log('se borro ',this.activities)
    
    this.activitiesChange.emit()
   
  }
}
