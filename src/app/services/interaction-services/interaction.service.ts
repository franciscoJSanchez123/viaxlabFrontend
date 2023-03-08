import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  hideForm:boolean=true
  hideActivityForm:EventEmitter<any>=new EventEmitter<any>();
  activityWithDate:EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  hide(option:string){
    switch(option){
      case 'open':
        this.hideForm=true;
        break;
      case 'close':
        this.hideForm=false;
        break;
      case 'change':
        this.hideForm=!this.hideForm
        break;
    }

    this.hideActivityForm.emit(this.hideForm);
  }


  addActivityWithDate(dates:any){
   

    this.activityWithDate.emit(dates);
  }
}
