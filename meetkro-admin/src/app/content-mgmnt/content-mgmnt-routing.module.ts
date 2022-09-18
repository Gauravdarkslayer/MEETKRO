import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentMgmntComponent } from './content-mgmnt.component';

const routes: Routes = [{ path: '', component: ContentMgmntComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentMgmntRoutingModule { }
