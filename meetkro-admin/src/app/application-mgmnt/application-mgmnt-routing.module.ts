import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationMgmntComponent } from './application-mgmnt.component';

const routes: Routes = [{ path: '', component: ApplicationMgmntComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationMgmntRoutingModule { }
