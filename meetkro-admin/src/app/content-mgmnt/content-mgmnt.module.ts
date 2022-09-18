import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentMgmntRoutingModule } from './content-mgmnt-routing.module';
import { ContentMgmntComponent } from './content-mgmnt.component';


@NgModule({
  declarations: [
    ContentMgmntComponent
  ],
  imports: [
    CommonModule,
    ContentMgmntRoutingModule
  ]
})
export class ContentMgmntModule { }
