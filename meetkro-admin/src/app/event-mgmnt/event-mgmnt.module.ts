import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventMgmntRoutingModule } from './event-mgmnt-routing.module';
import { EventMgmntComponent } from './event-mgmnt.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    EventMgmntComponent
  ],
  imports: [
    CommonModule,
    EventMgmntRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [DatePipe]

})
export class EventMgmntModule { }
