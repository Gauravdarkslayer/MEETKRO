import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ApplicationMgmntRoutingModule } from './application-mgmnt-routing.module';
import { ApplicationMgmntComponent } from './application-mgmnt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ApplicationMgmntComponent
  ],
  imports: [
    CommonModule,
    ApplicationMgmntRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [DatePipe]
})
export class ApplicationMgmntModule { }
