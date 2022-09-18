import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    DataTablesModule
  ],
  providers: [DatePipe]
})
export class ContactUsModule { }
