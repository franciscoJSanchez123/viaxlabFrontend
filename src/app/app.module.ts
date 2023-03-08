import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ActivityFormComponent } from './component/activity-form/activity-form.component';
import { ActivitiesListComponent } from './component/activities-list/activities-list.component';
import { ActivityComponent } from './component/activity/activity.component';
import { ActivityAvatarComponent } from './component/activity-avatar/activity-avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityFormComponent,
    ActivitiesListComponent,
    ActivityComponent,
    ActivityAvatarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
