import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventMgmntComponent } from './event-mgmnt.component';

const routes: Routes = [{ path: '', component: EventMgmntComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMgmntRoutingModule { }
