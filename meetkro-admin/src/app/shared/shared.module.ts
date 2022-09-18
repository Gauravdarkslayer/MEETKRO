import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LeftbarComponent } from './layout/leftbar/leftbar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LeftbarComponent
  ]
})
export class SharedModule { }
