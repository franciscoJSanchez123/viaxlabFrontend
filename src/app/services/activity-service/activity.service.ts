import { Injectable,EventEmitter } from '@angular/core';
import { Iactivity} from '../../models/Iactivity'
import { activities} from '../../activities/activities'
import { LocalStorageService } from '../localStorage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activity!:Iactivity;
  activities:Iactivity[]=[];
  activitiesAux:any;

  constructor(
    
    private localStorageService:LocalStorageService
    ) { }


 findAllActivities(){
  this.activities=activities
  this.localStorageService.saveActivities(this.activities)
  return this.activities
 }

 updateActivity(activity:Iactivity){
  console.log('todo bien aqui en el servicio de actididades',activity)
  this.localStorageService.updateActivity(activity)
 }

 createActivity(activity:Iactivity){
  this.localStorageService.saveActivity(activity)
 }

 deleteAllActivities(){
  this.localStorageService.deleteAllActivities()
 }

 deleteActivity(id:number){
  this.localStorageService.deleteActivity(id)
 }
}
