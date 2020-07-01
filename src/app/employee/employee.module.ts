import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    EmployeeRoutingModule
  ],
  entryComponents: [
  ]
})

export class EmployeeModule { }
