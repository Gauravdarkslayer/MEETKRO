import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMgmntComponent } from './payment-mgmnt.component';

const routes: Routes = [{ path: '', component: PaymentMgmntComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMgmntRoutingModule { }
