import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PaymentMgmntRoutingModule } from './payment-mgmnt-routing.module';
import { PaymentMgmntComponent } from './payment-mgmnt.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentMgmntComponent
  ],
  imports: [
    CommonModule,
    PaymentMgmntRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  providers: [DatePipe]
})
export class PaymentMgmntModule { }
